import { useState } from 'react';
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
import html2canvas from 'html2canvas';

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
        style || 'watercolor'
      } art`,
      n: 1,
      size: '512x512',
    });

    setImageSrc(response.data.data[0].url);
  };

  const generateShortStory = async () => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Topic: Unicorn\nTwo-Sentence Happy Story: Once upon a time, there was a happy unicorn named Sparkles who lived in a magical meadow filled with rainbows and sunshine. Sparkles spent her days frolicking through the meadow, spreading joy and laughter wherever she went.\n    \nTopic: Clam\nTwo-Sentence Happy Story:In the depths of the ocean, there was a little clam named Sammy. Sammy was a happy clam, content with his life in the sandy seabed, basking in the warm sunlight filtering through the water.\n    \nTopic: ${
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

    if (generatedSummary[0] === ':' || generatedSummary[0] === '-') {
      generatedSummary = generatedSummary.slice(1);
    }

    setTldr(generatedSummary);

    return generatedSummary;
  };

  const generateMagic = async (shortStory, storySummary) => {
    let story = await shortStory();
    let summary = await storySummary(story);
    generateImage(summary);
  };

  const saveStory = async () => {
    const canvas = await html2canvas(document.querySelector('#ai'), {
      logging: true,
      letterRendering: 1,
      allowTaint: true,
    });
    document.body.appendChild(canvas);
  };

  return (
    <div
      id='homepage'
      className="bg-[url('src/img/abstract-bg.jpg')] h-[calc(100vh_-_5rem)] bg-cover"
    >
      <h2 className=''>
        Add your own details or go ahead and press Magic for a random fun story!
      </h2>
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
              setTopic(evt.target.value.toLowerCase());
            }}
          />
          <FormControl sx={{ m: 1, minWidth: '35ch' }}>
            <InputLabel id='style-select'>art style</InputLabel>
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
              <MenuItem value={'watercolor'}>Watercolor</MenuItem>
              <MenuItem value={"children's book illustration"}>
                Illustration
              </MenuItem>
              <MenuItem value={'digital'}>Digital Art</MenuItem>
              <MenuItem value={'pixel'}>Pixel Art</MenuItem>
              <MenuItem value={'flat'}>Flat Art</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <div id='generateMagicButton'>
        <Button
          id='magic'
          variant='contained'
          disableElevation
          onClick={() => {
            generateMagic(generateShortStory, generateSummary);
          }}
        >
          MAGIC!
        </Button>
      </div>
      {story.length ? (
        <div id='ai'>
          <Box
            sx={{ width: '65%' }}
            m='auto'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap='15px'
          >
            <div id='generatedShortStory'>
              {story.length ? <p>{story}</p> : null}
            </div>
            <Box
              id='generatedImageAndSummary'
              sx={{ width: '100%' }}
              m='auto'
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              {imageSrc.length ? (
                <div id='results'>
                  <img src={imageSrc} id='generatedImage'></img>
                  <div id='caption'>
                    <p>{tldr ? tldr : null}</p>
                    <p>(art style: {style ? style : 'illustration'})</p>
                  </div>
                </div>
              ) : null}
            </Box>
          </Box>
        </div>
      ) : null}
      <div>
        <button onClick={saveStory}>SAVE</button>
      </div>
    </div>
  );
};

export default Home;
