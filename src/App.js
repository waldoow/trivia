import {Card, Button} from 'react-bootstrap';
import QueryForm from './components/Form.js'
import { useState, useEffect } from 'react';


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    console.log('test');
    return () => {
    }
  }, [isGameStarted])

  return (
    <div className="App">
      <div className="container">
        {
          isGameStarted ?
            <div>
              <h1>hi</h1>
            </div>
            :
            <QueryForm updateGameState={(gameState, reponseJson) => {
                setIsGameStarted(gameState);
                
              }
            }/>
        }
      </div>
    </div>

  );
}

export default App;
