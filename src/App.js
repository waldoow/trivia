import QueryForm from './components/Form.js'
import { useState, useEffect } from 'react';


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
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
            <QueryForm updateGameState={(gameState) => {
                setIsGameStarted(gameState);
              }
            }/>
        }
      </div>
    </div>

  );
}

export default App;
