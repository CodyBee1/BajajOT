import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Handle the JSON input field
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput); // Validate the JSON input
      setError(''); // Clear previous errors
      const res = await axios.post('https://bajaj-ot-adnan-qamars-projects.vercel.app/bhfl', parsedInput);
      setResponse(res.data); // Save the response
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  // Handle option selection
  const handleOptionChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
  };

  // Render filtered response based on selected options
  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredData = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>RA2111003030021</h1>

      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            rows="5"
            cols="50"
            placeholder='{"data": ["A", "1", "b", "3"]}'
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          <label>
            Filter Response:
            <select multiple onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>
          </label>

          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
