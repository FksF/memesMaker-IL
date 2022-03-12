import React, { useCallback, useRef, useState } from 'react'
import BoxTemplateComponent from '../../components/BoxTemplateComponent/BoxTemplateComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import useTemplatesHandle from '../../hooks/useTemplatesHandle';
import '../HomePage/HomePage.css'

const HomePage = () => {
  const [ page, setPage ] = useState(1);
  const { templates, loader, error, empty } = useTemplatesHandle(page);

  const observer = useRef();
  const lastNewRef = useCallback( node => {
    if (loader) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log(entries[0].isIntersecting, empty);
      if (entries[0].isIntersecting && empty) {
        setPage( prevPage => prevPage + 1);
      }
    });
    if(node) observer.current.observe(node);
  }, [ loader, empty ]);

  return (
    <>
      <HeaderComponent />
      <section className='templates-content'>
        {templates.map((aTemplate, index) => {
          if (templates.length === index +1) {
            return <div ref={lastNewRef} key={aTemplate.id}><BoxTemplateComponent url={aTemplate.url} name={aTemplate.name} box_count={aTemplate.box_count} tmp={aTemplate}/></div>
          } else {
            return <div key={aTemplate.id}><BoxTemplateComponent url={aTemplate.url} name={aTemplate.name} box_count={aTemplate.box_count} tmp={aTemplate}/></div>
          }
        })}
      </section>
      <LoaderComponent loader={loader} />
      <div>{ error && 'Error' }</div>
    </>
  );
}

export default HomePage