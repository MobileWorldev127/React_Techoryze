import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Main from './views/weather/main';
import Chat from './views/chat/Chat';
import './App.css';
function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route
          exact
          path="/"
          name="Chat Page"
          render={(props) => <Chat {...props} />}
        />
        <Route
          exact
          path="/"
          name="Weatehr Page"
          render={(props) => <Main {...props} />}
        />
      </Switch> */}
      <Chat />
    </div>
  );
}

export default App;
