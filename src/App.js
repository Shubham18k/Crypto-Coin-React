import {useState,useEffect} from 'react';
import Coin from './Coin';
import './App.css';

function App() {
  const[data,setData]=useState([])
  const [search, setSearch] = useState('');
  

  useEffect(()=>{
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((response) => response.json())
    .then((cur) => setData(cur))
    .catch((err) => {
      alert(err);
    });
  },[])

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filtereddata = data.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(data)

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filtereddata.map(data =>{
        return(
          <Coin  
            key={data.id}
            name={data.name}
            price={data.current_price}
            symbol={data.symbol}
            marketcap={data.total_volume}
            volume={data.market_cap}
            image={data.image}
            priceChange={data.price_change_percentage_24h}
          />
        )
      })}
    </div>
  );
}

export default App;
