import React , {useEffect, useState} from 'react';
import '../styles/PortfolioPage.css'
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where , doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

const PortfolioPage = () => {

  const [portfolio, setPortfolio] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){

        const fetchData = async () => {
          try{
            const q = query(collection(db, "purchases"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const portfolioData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            await fetchCurrentPrices(portfolioData);
          } catch (error) {
            console.error("Error fetching portfolio data: ", error);
          }
            };
            fetchData();
          }
        });
      
        return () => unsubscribe();
     // eslint-disable-next-line
  }, []);

  
  const fetchCurrentPrices = async (portfolioData) => {
    const updatedPortfolio = await Promise.all(portfolioData.map(async (stock) => {
      try {
        console.log("Fetching price for:", stock.companyName);
        const response = await axios.get(`http://127.0.0.1:5000/get_stock_data?ticker=${stock.tickerSymbol}`);
        console.log("Response for", stock.companyName, ":", response.data);
        return { ...stock, currentPrice: response.data.current_price };
      } catch (error) {
        console.error("Error fetching current stock price: ", stock.companyName, ":",error);
        return { ...stock, currentPrice: "Error" }; 
      }
    }));
    setPortfolio(updatedPortfolio);
  };

  const calculatePL = (currentPrice, buyPrice, quantity) => {
    return (currentPrice - buyPrice) * quantity;
  };

  const totalGain = portfolio.reduce((acc, stock) => {
    const pl = isNaN(stock.currentPrice) 
      ? 0 
      : calculatePL(stock.currentPrice, stock.buyPrice, stock.quantity);
    return acc + pl;
  }, 0);

  const handleSellClick = async (stockId, availableQuantity) => {
    const sellQuantity = prompt('Enter the quantity you want to sell:', '0');
    const sellQtyNumber = parseInt(sellQuantity);

    if (isNaN(sellQtyNumber) || sellQtyNumber <= 0) {
      alert('Invalid quantity entered.');
      return;
    }

    if (sellQtyNumber > availableQuantity) {
      alert('You cannot sell more than you own.');
      return;
    }

    try {
      const stockDocRef = doc(db, 'purchases', stockId);
      if (sellQtyNumber === availableQuantity) {
        await deleteDoc(stockDocRef);
      } else {
        await updateDoc(stockDocRef, {
          quantity: availableQuantity - sellQtyNumber
        });
      }
      alert('Stocks sold successfully!');
      const user = auth.currentUser;
      if (user) {
        fetchData(user.uid);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Error processing sale.');
    }
  };

  const fetchData = async (userId) => {
    try {
      
      const q = query(collection(db, "purchases"), where("userId", "==", userId));
  
      
      const querySnapshot = await getDocs(q);
  
      
      const portfolioData = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data() 
      }));
  
      
      await fetchCurrentPrices(portfolioData);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  return (
    <div className='portfolio-container'>
      <div className={totalGain >= 0 ? 'total-gain-positive' : 'total-gain-negative'}>
        Total Gain: {totalGain.toFixed(2)}
      </div>
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Company Name</th>
            <th>Qty</th>
            <th>Buy Price</th>
            <th>Cur. Value</th>
            <th>P&L</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.length > 0 ? (
            portfolio.map((stock, index) => {
              const pl = isNaN(stock.currentPrice) 
                ? '--' 
                : calculatePL(stock.currentPrice, stock.buyPrice, stock.quantity).toFixed(2);
              return (
                <tr key={stock.id}>
                  <td>{index + 1}</td>
                  <td>{stock.companyName}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.buyPrice.toFixed(2)}</td>
                  <td>{isNaN(stock.currentPrice) ? '--' : stock.currentPrice.toFixed(2)}</td>
                  <td className={pl >= 0 ? 'pl-positive' : 'pl-negative'}>{pl}</td>
                  <td>
                  <button onClick={() => handleSellClick(stock.id, stock.quantity)}>Sell</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='7'>You don't have any stocks in your portfolio.</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};



export default PortfolioPage;
