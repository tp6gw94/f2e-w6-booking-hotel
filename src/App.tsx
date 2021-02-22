import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import RoomInfo from './pages/RoomInfo';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/room_info/:id">
          <RoomInfo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
