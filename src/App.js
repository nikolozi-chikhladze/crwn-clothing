import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.components.jsx';
import { Switch, Route } from 'react-router-dom';


const HatsPage = () => {
  return (
    <div>
      <h1>Hats page</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route 
          path='/'
          component={HomePage}
          exact
        />
        <Route
          path="/hats"
          component={HatsPage}
        />
      </Switch>
    </div>
  );
}

export default App;
