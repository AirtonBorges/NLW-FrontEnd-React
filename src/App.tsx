import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NewRoom } from '../src/pages/NewRoom';
import { Home } from '../src/pages/Home';
import { Room } from '../src/pages/Room';
import { AdminRoom } from '../src/pages/AdminRoom';

import { ContextProvider } from '../src/contexts/AuthContext'


function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/rooms/new" component={ NewRoom } />
          <Route path="/rooms/:id" component= { Room } />
          <Route path="/admin/rooms/:id" component= { AdminRoom } />
        </Switch>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
