import { BrowserRouter, Route } from 'react-router-dom';

import { NewRoom } from '../src/pages/NewRoom'
import { Home } from '../src/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ Home }/>
      <Route path="/rooms/new" component={ NewRoom }/>
    </BrowserRouter>
  );
}

export default App;
