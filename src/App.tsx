import { Button } from '../src/components/Button'

function App() {
  return (
    <div>
    <h1>Hello World</h1>
    <Button id="But1" other_id="But2" /> 
    <Button id="But2" other_id="But1" />
    </div>
  );
}

export default App;
