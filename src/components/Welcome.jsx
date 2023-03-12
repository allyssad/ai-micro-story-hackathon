import { useState } from 'react';
import '../css/main.css';
import { Configuration, OpenAIApi } from 'openai';

// flat art, surrealistic art, naturalism,

const Welcome = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('');
  const [story, setStory] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [tldr, setTldr] = useState('');

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: `${tldr || story} in the style of ${
        style || "children's book illustration"
      } art`,
      n: 1,
      size: '1024x1024',
    });

    setImageSrc(response.data.data[0].url);
  };

  const generateShortStory = async () => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Topic: Unicorn\nTwo-Sentence Happy Story: Once upon a time, there was a happy unicorn named Sparkles who lived in a magical meadow filled with rainbows and sunshine. Sparkles spent her days frolicking through the meadow, spreading joy and laughter wherever she went.\n    \nTopic: ${
        name ? name + ' ' + topic : topic
      }\nTwo-Sentence Happy Story: .`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const generatedStory = response.data.choices[0].text;
    setStory(generatedStory);
    console.log(generatedStory);
  };

  const generateSummary = async () => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${story}\n\nTl;dr`,
      temperature: 0.7,
      max_tokens: 30,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });

    let generatedSummary = response.data.choices[0].text.trim();
    if (generatedSummary[0] === ':' || generatedSummary[0] === '-')
      generatedSummary = generatedSummary.slice(1);
    console.log(generatedSummary);
    setTldr(generatedSummary);
  };

  const callOpenAIAPI = async (evt) => {
    evt.preventDefault();
    console.log('calling OpenAI API');
    console.log('NAME:', name);
    console.log('TOPIC:', topic);
    console.log('STYLE:', style);
  };

  const saveHandler = () => {
    console.log('save');
  };

  return (
    <>
      <h1>AI Micro Story Hour</h1>
      <form onSubmit={generateShortStory}>
        <label htmlFor='name'>Enter a name:</label>
        <input
          type='text'
          label='name'
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        ></input>
        <label htmlFor='topic'>Enter a topic:</label>
        <input
          type='text'
          label='topic'
          value={topic}
          onChange={(evt) => {
            setTopic(evt.target.value);
          }}
        ></input>
        <div>
          <label htmlFor='style-select'>Select an Art Style:</label>
          <select
            name='styles'
            id='style-select'
            type='text'
            value={style}
            onChange={(evt) => {
              setStyle(evt.target.value);
            }}
          >
            <option value='' disabled>
              Select a Style:
            </option>
            <option value={'digital art'}>Digital Art</option>
            <option value={"children's book illustration"}>Illustration</option>
            <option value={'pixel art'}>Pixel Art</option>
            <option value={'photorealistic'}>Photorealistic</option>
          </select>
        </div>
        <button type='submit'>Go!</button>
      </form>
      <div>
        <h2>RESULTS:</h2>
      </div>
      <div> {story.length ? <p>{story}</p> : 'AI Micro Story Holder...'}</div>
      <div>
        {imageSrc.length ? (
          <>
            <img src={imageSrc}></img>
            <p>{tldr}</p>
            <p>In the style of: {style ? style : 'illustration'}</p>
          </>
        ) : (
          'AI Image Holder...'
        )}
      </div>
      <button onSubmit={saveHandler}>SAVE</button>
      <div>
        <button onClick={generateImage}>Image</button>
      </div>
      <div>
        <button onClick={generateShortStory}>Story</button>
      </div>
      <div>
        <button onClick={generateSummary}>Summary</button>
      </div>
    </>
  );
};

export default Welcome;
