import React, { useState } from 'react';
import apiServices from './apiServices';

export default function SearchResult({ results, networkErr, errorMsg }) {
  const defaultMainImg = apiServices().defaultMainImg;
  const [resultCards, setResultCards] = useState([]);
  const [initiatePagination, setPaginationDone] = useState(false);
  const api = apiServices();
  let paginatedPageContainer = [];

  const parseHtml = (html) => {
    return { __html: html.toString() };
  };
  function openUrl(title) {
    document.getElementById('name_' + title).classList.add('visited');
    api.openUrl(title);
  }

  const resultCardList = results.map((result, key) => {
    return (
      <div
        className="result-card"
        id={result.id}
        key={key}
        onClick={() => openUrl(result.key)}
      >
        <div className="des">
          <strong className="main-title" id={'name_' + result.key}>
            {result.title}
          </strong>
          <p>{result?.description}</p>
          <div dangerouslySetInnerHTML={parseHtml(result?.excerpt)}></div>
        </div>
        <div className="main-img">
          <img
            src={result.thumbnail ? result?.thumbnail?.url : defaultMainImg}
          />
        </div>
      </div>
    );
  });

  const paginationProcess = () => {
    paginatedPageContainer = [];
    let temp = [...resultCardList],
      _chunk = [];
    while (temp.length > 0) {
      _chunk = temp.splice(0, 10);
      paginatedPageContainer.push(_chunk);
    }
  };

  const paginator = (e = null, index = 0) => {
    if (e != null) {
      e.preventDefault();
      index = Number(e.target.id);
      e.stopPropagation();
      activeBtnStyling(e.target.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (
      index < paginatedPageContainer.length &&
      paginatedPageContainer.length !== 0
    )
      setResultCards(paginatedPageContainer[index]);
    setPaginationDone(true);
  };

  const activeBtnStyling = (id) => {
    let pageBtnList = document.getElementById('result-paginator');
    if (pageBtnList.id == id) return;
    let list = Array.from(pageBtnList.children);
    list.map((element) => {
      if (id === element.id) element.classList.toggle('activePageBtn');
      else element.classList.remove('activePageBtn');
    });
  };

  if (results.length !== 0) {
    paginationProcess();
    if (!initiatePagination) {
      paginator(null, 0);
      setTimeout(() => activeBtnStyling('0'), 1000);
    }
  }

  const pagination = paginatedPageContainer.map((page, index) => {
    let page_number = index + 1;
    return (
      <div key={index} id={index}>
        {page_number}
      </div>
    );
  });

  if (results.length !== 0) {
    return (
      <>
        <div id="search-result-container">{resultCards}</div>
        <div id="page-text">Pages</div>
        <div id="result-paginator" onClick={(e) => paginator(e)}>
          {pagination}
        </div>
      </>
    );
  } else {
    return <p id="result-error-msg">{errorMsg}</p>;
  }
}
