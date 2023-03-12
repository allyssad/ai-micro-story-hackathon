import { useState } from 'react';
import '../css/main.css';

const Welcome = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('');
  const [story, setStory] = useState('');
  const [image, setImage] = useState('');

  const callOpenAIAPI = (evt) => {
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
      <form onSubmit={callOpenAIAPI}>
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
            <option value={'comic book'}>Comic Book</option>
          </select>
        </div>
        <button type='submit'>Go!</button>
      </form>
      <div>
        <h2>RESULTS:</h2>
      </div>
      <div> {story.length ? <p>{story}</p> : 'AI Micro Story Holder...'}</div>
      <div>{image.length ? <p>{image}</p> : 'AI Image Holder...'}</div>
      <button onSubmit={saveHandler}>SAVE</button>
    </>
  );
};

export default Welcome;
