import React from 'react';
import { useState } from 'react';
import {useLocation } from 'react-router-dom';
import '../styles/StockDetailsPage.css';
import Logo from '../assets/logo.png';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

function StockDetailsPage() {
    const location = useLocation();
    const { stockData } = location.state || {};
    const [quantity, setQuantity] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

    const handleBuyClick = async () => {
        if (!quantity) {
            alert('Please enter a quantity.');
            return;
        }

        const confirmPurchase = window.confirm(
            `Do you want to buy ${quantity} share(s) of ${stockData.company_name} at ${stockData.current_price}?`
        );

        if (confirmPurchase) {
            if (user) {
                try {
                    const purchasesCollectionRef = collection(db, "purchases");
                    await addDoc(purchasesCollectionRef, {
                        userId: user.uid,
                        companyName: stockData.company_name,
                        quantity: quantity,
                        buyPrice: stockData.current_price,
                        tickerSymbol: stockData.ticker_symbol,
                    });
                    alert('Purchase confirmed!');
                } catch (error) {
                    console.error("Error adding document: ", error);
                    alert('Error processing purchase.');
                }
            } else {
                alert('You must be logged in to make a purchase.');
            }  
        } else {
            alert('Purchase cancelled.');
        }
    };
    
    return (
        <div className="stock-details-container">
            <img src={Logo} alt="Logo" className="logo" />
            {stockData ? (
                 <div className="stock-details">
                 <h1 className="company-name">{stockData.company_name}</h1>
                 <div className="current-price">Current Price: {stockData.current_price}</div>
                 <div className="stock-info">
                     <div className="left-panel">
                         <div>Open Price: {stockData.open_price}</div>
                         <div>Today's High: {stockData.todays_high}</div>
                         <div>Today's Low: {stockData.todays_low}</div>
                     </div>
                     <div className="right-panel">
                         
                         <div>Market Cap: {stockData.market_cap}</div>
                         <div>PE Ratio: {stockData.pe_ratio}</div>
                         <div>Dividend: {stockData.dividend}</div>
                         <div>52 Week High: {stockData.fiftytwoweekhigh}</div>
                         <div>52 Week Low: {stockData.fiftytwoweeklow}</div>
                        
                     </div>
                 </div>
                 <div className="buy-section">
                        <input type="number" 
                         value={quantity}
                         onChange={(e) => setQuantity(e.target.value)}
                         placeholder="Quantity" 
                        />
                        <button onClick={handleBuyClick}>Buy</button>
                    </div>
                </div>
            ) : (
                <p>No stock data available. Please search again.</p>
            )}
        </div>
    );
}

export default StockDetailsPage;
