import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import '../GenerateMemePage/GenerateMemePage.css';
const GenerateMemePage = () => {
  const [ meme ] = useState(JSON.parse(localStorage.getItem('memeToGenerate')));
  const [ imgToShow, setImgToShow ] = useState(meme.url);
  const [ loader, setLoader ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ inputs, setInputs ] = useState([]);
  
  const updateInputs = (e, index) => {
    const text = e.target.value || '';
    setInputs(
      inputs.map((c, i) => {
        if(index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    setLoader(true);
    setError(false);
    const currentMeme = meme;
    const formData = new FormData();
    formData.append('username', 'FksF');
    formData.append('password', '31816120');
    formData.append('template_id', currentMeme.id);
    inputs.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    axios('https://api.imgflip.com/caption_image', {
      method: 'POST',
      data: formData
    }).then(res => {
      setImgToShow(res.data.data.url);
      setLoader(false);
    }).catch(e => {
      setError(true);
    });;
  };

  useEffect(()=>{
    setInputs(Array(meme.box_count).fill('')); 
    console.log('meme', meme);
  }, [meme]);

  useEffect(()=>{
    console.log(inputs );
  },[inputs]);
  return (
    meme ?
    <div>
      <HeaderComponent/>
      <button onClick={generateMeme}>Generate</button>
      {
        inputs.map((c, index) => (
          <input style={{borderRadius: '6px'}} key={index} onChange={(e) => updateInputs(e, index)} placeholder={`Ingresa texto ${index + 1}`}/> 
        ))
      }
      <a href={imgToShow} rel='noopener noreferrer' style={{display: 'block', textAlign: 'center', color: 'white'}} target='_blank'> Click me to download the current image </a>
      <img className='img-gen' src={imgToShow} alt={meme.name} />
      <LoaderComponent loader={loader} />
      <div>{ error && 'Error' }</div>
    </div> 
    : <> </>
  )
}

export default GenerateMemePage