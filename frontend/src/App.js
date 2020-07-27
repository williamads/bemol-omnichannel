import React, { useState } from 'react';
import './App.css';

import FormPF from './components/FormPF/FormPF';
import FormPJ from './components/FormPJ/FormPJ';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <h1>Bemol Omnichannel</h1>

      <button onClick={() => {setState(1)}}>Criar usuário PF</button>
      <button onClick={() => {setState(2)}}>Criar usuário PJ</button>

      {
        state === 1 ? <FormPF /> : (state === 2 ? <FormPJ /> : <p>Escolha o tipo de usuário</p>)
      }
      
    </div>
  );
}

export default App;
