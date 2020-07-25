import React from 'react';
import './App.css';

import FormPF from './components/FormPF/FormPF';
import FormPJ from './components/FormPJ/FormPJ';

function App() {
  return (
    <div className="App">
        <h1>Bemol Omnichannel</h1>

        <FormPF />
        <FormPJ />
    </div>
  );
}

export default App;
