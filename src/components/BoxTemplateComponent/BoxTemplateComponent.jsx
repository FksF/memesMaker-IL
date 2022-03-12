import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../BoxTemplateComponent/BoxTemplateComponent.css'

const BoxTemplateComponent = ({url, name, box_count, tmp}) => {
  let navigate = useNavigate();
  const generating = () => {
    localStorage.setItem('memeToGenerate', JSON.stringify(tmp));
    navigate('/generating');
  };
  return (
    <article className='box-content' onClick={generating}>
      <img className='img-cnt' src={url} alt={name} />
      <div className='detail-cnt'>
        <h2>{name}</h2>
        <div className='line'></div>
        {
          box_count === 1 ? <p>Acepta {box_count} texto</p> : <p>Acepta {box_count} textos</p>
        }
      </div>
    </article>
  )
}

export default BoxTemplateComponent