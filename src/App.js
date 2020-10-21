import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Cards from './components/main/Cards/Cards';
import Navbar from './components/shared/Navbar/Navbar';
import AddCard from './components/main/AddCard/AddCard';
import EditCard from './components/main/EditCard/EditCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Cards} />
        <Route path="/add-card" component={AddCard} />
        <Route path="/cards/:id/edit" component={EditCard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
