import React from 'react';
import NavBar from './Navbar';
import './App.css';
import PokemenData from './PokemonData';
import { AppProvider } from './AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <NavBar />
        <PokemenData />
      </AppProvider>
    </div>
  );
}

export default App;
