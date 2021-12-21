import React, { useState, useEffect } from 'react';
import Icons from './icons';
import apiServices from './apiServices';
import SearchResult from './searchResult';
import Loading from './loadingScreen';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const [showLoadingScreen, callLoadingScreen] = useState(false);
  const [result, setNewResult] = useState([]);
  const [guide, setNewGuide] = useState('Press Enter to Search');
  const [showGuide, setShowGuide] = useState(false);
  const loadingInfo = 'Loading...';
  const [networkErr, setNetworkErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const api = apiServices();
  const searchQuery = async (e) => {
    e.preventDefault();
    if (searchValue == '') setErrorMsg('');

    if (e.keyCode === 13) {
      if (searchValue == '') return;
      setNewGuide(loadingInfo);
      callLoadingScreen(true);
      e.target.blur();
      const response = await api
        .search('en', searchValue, 100)
        .then((obj) => obj);

      //set state values
      if (response.error)
        setErrorMsg('Something went wrong! Please try again later.');
      else if (!response.error && response.result.pages == 0)
        setErrorMsg('Sorry, No results to be found.');
      setNetworkErr(response.error);
      setNewResult(response.result.pages);
      setNewGuide(response.result.pages.length + ' results found.');
      callLoadingScreen(false);
    }
  };

  const openGuide = (e) => {
    setNewGuide('Press Enter to Search');
    if (e.target.value != '') setShowGuide(true);
    else setShowGuide(false);
  };

  const gotoHomepage = () => {
    setNewResult([]);
    setNewGuide('');
    setSearchValue('');
    setNetworkErr(false);
    setErrorMsg('');
  };

  return (
    <>
      <div id="search-bar-container">
        <div>
          <h1 id="search-bar-title">
            <span style={{ cursor: 'pointer' }} onClick={gotoHomepage}>
              <img src={api.defaultMainImg} id="logo" />
              WiKi IndeX
            </span>
          </h1>
          <div id="tagline">A Wikipedia search engine</div>
        </div>
        <input
          type="text"
          value={searchValue}
          id="search-bar"
          onChange={(e) => setSearchValue((prev) => e.target.value)}
          onKeyUp={(e) => searchQuery(e)}
          onInput={(e) => openGuide(e)}
          placeholder="Enter the search term"
        />
        <Icons iconName="faSearch" />
        {showGuide ? <div id="guide">{guide}</div> : <></>}
      </div>
      {showLoadingScreen ? (
        <Loading />
      ) : (
        <SearchResult
          results={result}
          networkErr={networkErr}
          errorMsg={errorMsg}
        />
      )}
    </>
  );
}
