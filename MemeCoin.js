import React, { useState, useEffect } from 'react';

function MemeCoin() {
  const [memeCoins, setMemeCoins] = useState([]);

  useEffect(() => {
    // Fetch meme coin options from backend API
    fetchMemeCoins();
  }, []);

  const fetchMemeCoins = async () => {
    try {
      const response = await fetch('/api/memeCoins'); // Adjust API endpoint accordingly
      const data = await response.json();
      setMemeCoins(data);
    } catch (error) {
      console.error('Error fetching meme coins:', error);
    }
  };

  const handleVote = async (selectedCoin) => {
    try {
      // Submit vote to backend API
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCoin }),
      });
      if (response.ok) {
        // Handle successful vote
        console.log('Vote submitted successfully!');
      } else {
        // Handle vote error
        console.error('Failed to submit vote:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div>
      <h2>Meme Coin Voting Dashboard</h2>
      <ul>
        {memeCoins.map((coin, index) => (
          <li key={index}>
            <span>{coin}</span>
            <button onClick={() => handleVote(coin)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemeCoin;
