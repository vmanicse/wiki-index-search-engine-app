import React from 'react';
import apiServices from './apiServices';

export default function Loading() {
  const api = apiServices();
  const loadingStyle = {
    width: 'fit-content',
    margin: '50px auto',
    fontWeight: 'bold',
    color: '#3f51b5',
  };
  return (
    <>
      <div style={loadingStyle}>Results are Loading... Please Wait!</div>
      <div id="loading-img">
        <img src={api.defaultMainImg} />
      </div>
    </>
  );
}
