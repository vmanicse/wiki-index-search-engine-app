import { useState } from 'react';

export default function apiServices() {
  const [lang, setLang] = useState('en');
  const url = 'https://api.wikimedia.org/core/v1/wikipedia/';
  const defaultMainImg =
    'https://upload.wikimedia.org/wikipedia/commons/b/b3/Wikipedia-logo-v2-en.svg';

  const search = async (language, query, limit = 100) => {
    setLang(language);
    const tempUrl = `${url}${language}/search/page?q=${query}`;
    const endPoint = limit === 0 ? tempUrl : tempUrl + `&limit=${limit}`;
    let result = new Object();
    let error = false;
    try {
      const response = await fetch(endPoint);
      result = await response.json();

      if (response.status !== 200) throw e;
      else error = false;
    } catch (e) {
      result['pages'] = [];
      error = true;
    }
    return { result, error };
  };

  const openUrl = (title) => {
    const endPoint = `https://${lang}.wikipedia.org/wiki/`;
    window.open(`${endPoint}${title}`, '_blank');
  };

  return { search, openUrl, defaultMainImg };
}
