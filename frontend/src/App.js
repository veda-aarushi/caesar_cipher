import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState([]);

  const handleEncrypt = async () => {
    const res = await axios.post('http://localhost:5000/encrypt', { text, shift });
    setResult(res.data.result);
    setSteps(res.data.steps);
  };

  const handleDecrypt = async () => {
    const res = await axios.post('http://localhost:5000/decrypt', { text, shift });
    setResult(res.data.result);
    setSteps(res.data.steps);
  };

  return (
    <div className="App">
      <div className="App-container">
        <h1>Caesar Cipher Encryption & Decryption</h1>

        <div>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            placeholder="Shift"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
          />
        </div>

        <div>
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>

        {result && (
          <div className="result-box">
            <h2>Result:</h2>
            <p>{result}</p>

            <h3>Steps:</h3>
            <ul>
              {steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
