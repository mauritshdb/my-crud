import './App.css';
import { useEffect, useState } from 'react';
import { Axios } from 'axios';

function App() {

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response) {
        setData(response.data.data)
      });
  }

  return (
    <>
      <h1>Test</h1>
    </>
  );
}

export default App;
