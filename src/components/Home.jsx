import { useState } from 'react';
import '../css/main.css';
import { Configuration, OpenAIApi } from 'openai';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

// flat art, surrealistic art, naturalism,

const Home = () => {
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

  const generateImage = async (context) => {
    const response = await openai.createImage({
      prompt: `${context || story} in the style of ${
        style || "children's book illustration"
      } art`,
      n: 1,
      size: '512x512',
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
    return generatedStory;
  };

  const generateSummary = async (context) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${context}\n\nTl;dr`,
      temperature: 0.7,
      max_tokens: 30,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });

    let generatedSummary = response.data.choices[0].text.trim();
    if (generatedSummary[0] === ':' || generatedSummary[0] === '-')
      generatedSummary = generatedSummary.slice(1);
    // console.log(generatedSummary);
    setTldr(generatedSummary);
    return generatedSummary;
  };

  const generateMagic = async (shortStory, storySummary) => {
    let story = await shortStory();
    console.log(story);
    let summary = await storySummary(story);
    console.log(summary);
    generateImage(summary);
  };

  return (
    <div id='homepage'>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div id='story-inputs'>
          <TextField
            type='text'
            label='name'
            value={name}
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />

          <TextField
            type='text'
            label='topic'
            value={topic}
            onChange={(evt) => {
              setTopic(evt.target.value);
            }}
          />
          <FormControl sx={{ m: 1, minWidth: '35ch' }}>
            <InputLabel id='style-select'>Art Style</InputLabel>
            <Select
              type='text'
              labelId='select-label'
              label='art style'
              id='art'
              value={style}
              onChange={(evt) => {
                setStyle(evt.target.value);
              }}
            >
              <MenuItem value={'digital'}>Digital Art</MenuItem>
              <MenuItem value={"children's book illustration"}>
                Illustration
              </MenuItem>
              <MenuItem value={'pixel'}>Pixel Art</MenuItem>
              <MenuItem value={'watercolor'}>Watercolor</MenuItem>
              <MenuItem value={'flat'}>Flat Art</MenuItem>
            </Select>
          </FormControl>
          {/* <button type='submit'>Go!</button> */}
        </div>
      </Box>
      <div>
        <Button
          variant='contained'
          disableElevation
          onClick={() => {
            generateMagic(generateShortStory, generateSummary);
          }}
        >
          MAGIC!
        </Button>
      </div>
      <div> {story.length ? <p>{story}</p> : null}</div>
      <div>
        {imageSrc.length ? (
          <>
            <img src={imageSrc}></img>
            <p>{tldr ? tldr : ''}</p>
            <p>In the style of: {style ? style : 'illustration'}</p>
          </>
        ) : null}
      </div>
      {/* <button onSubmit={saveHandler}>SAVE</button> */}
      {/* <Button
          variant='contained'
          disableElevation
          onClick={generateShortStory}
        >
          Story
        </Button> */}

      {/* <div>
        <button onClick={generateSummary}>Summary</button>
      </div>
      <div>
        <button onClick={generateImage}>Image</button>
      </div> */}
    </div>
  );
};

export default Home;
