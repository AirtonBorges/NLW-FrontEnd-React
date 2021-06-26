import { BrowserRouter, Route } from 'react-router-dom';

import { NewRoom } from '../src/pages/NewRoom';
import { Home } from '../src/pages/Home';
import { ContextProvider } from '../src/contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Route path="/" exact component={ Home }/>
        <Route path="/rooms/new" component={ NewRoom }/>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
