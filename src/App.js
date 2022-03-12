import { useCallback, useRef, useState } from 'react';
import './App.css';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import useTemplatesHandle from './hooks/useTemplatesHandle';

function App() {
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
      <section className='templates-content'>
        {templates.map((aTemplate, index) => {
          if (templates.length === index +1) {
            return <div className='box-template' ref={lastNewRef} key={aTemplate.id}>{aTemplate.name}</div>
          } else {
            return <div className='box-template' key={aTemplate.id}>{aTemplate.name}</div>
          }
        })}
      </section>
      <LoaderComponent loader={loader} />
      <div>{ error && 'Error' }</div>
    </>
  );
}

export default App;
