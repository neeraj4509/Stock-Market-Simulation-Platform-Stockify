import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../styles/HomePage.css';

import axios from 'axios';


function HomePage () {
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate(); 


  const [nifty50, setNifty50] = useState('');
  const [banknifty, setBanknifty] = useState('');
  const [finnifty, setFinnifty] = useState('');
  const [nifty500, setNifty500] = useState('');
  const [sensex, setSensex] = useState('');

  

  const fetchStockData = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/get_stock_data?ticker=${ticker}`);
        navigate('/stock-details', { state: { stockData: response.data } });
    } catch (error) {
        console.error('Error fetching stock data', error);
    }
  };

  useEffect(() => {
   
    const fetchIndices = async () => {
        try {
            const urls = [
                'http://127.0.0.1:5000/get_index_data?index=NIFTY_50',
                'http://127.0.0.1:5000/get_index_data?index=BANK_NIFTY',
                'http://127.0.0.1:5000/get_index_data?index=FINNIFTY',
                'http://127.0.0.1:5000/get_index_data?index=NIFTY_500',
                'http://127.0.0.1:5000/get_index_data?index=SENSEX',

            ];

            const [nifty50Response, bankniftyResponse, finniftyResponse, nifty500Response, sensexResponse] = await Promise.all(
                urls.map(url => axios.get(url))
            );

            setNifty50(nifty50Response.data.currentPrice);
            setBanknifty(bankniftyResponse.data.currentPrice);
            setFinnifty(finniftyResponse.data.currentPrice);
            setNifty500(nifty500Response.data.currentPrice);
            setSensex(sensexResponse.data.currentPrice);

        } catch (error) {
            console.error('Error fetching index data', error);
            // Handle the error appropriately
        }
    };

      fetchIndices();
    }, []);

  return (
    <div className= "main-container">
      <div className="welcome-container">
        <h1>Welcome to Stockify!</h1>
      </div>

      <div className="indices-container">
        <div className="index-card">
          <div className="index-name">NIFTY 50</div>
          <div className="index-value">{nifty50}</div>
        </div>
        <div className="index-card">
          <div className="index-name">Nifty Bank</div>
          <div className="index-value">{banknifty}</div>
        </div>
        <div className="index-card">
          <div className="index-name">Nifty Financial Services</div>
          <div className="index-value">{finnifty}</div>
        </div>
        <div className="index-card">
          <div className="index-name">NIFTY 500</div>
          <div className="index-value">{nifty500}</div>
        </div>
        <div className="index-card">
          <div className="index-name">BSE SENSEX</div>
          <div className="index-value">{sensex}</div>
        </div>
      </div>

      <div className="search-container">
      <input
              type="text"
               value={ticker}
               onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter Stock Symbol"
          />
           <button onClick={fetchStockData}>Get Stock Data</button>
      </div>
    </div>
  );
};

export default HomePage;


