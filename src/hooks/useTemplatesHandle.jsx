import axios from 'axios';
import { useEffect, useState } from 'react';

const useTemplatesHandle = (page) => {
  const [ templates, setTemplates ] = useState([]);
  const [ loader, setLoader ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ empty, setEmpty ] = useState(false);

  useEffect(() => {
    setLoader(true);
    setError(false);
    axios({
      method: 'GET',
      url: `https://622ad10514ccb950d226129f.mockapi.io/fksf/v1/${page}`
    }).then( res => {
      setTemplates( templates => {
        return  [...templates, ...res.data];
      });
      setEmpty(res.data.length > 0);
      setLoader(false);
    }).catch(e => {
      if (page === 5) {
        setEmpty(false);
        setLoader(false);
        setError(false);
      } else {
        setError(true);
      }
    });
  }, [ page ]);
  return { templates, loader, error, empty };
}

export default useTemplatesHandle