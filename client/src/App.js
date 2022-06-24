import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/result');
      console.log(res);

      setData(res);
    };
    fetchData();
  }, []);
  return <div className="App">hello</div>;
}

export default App;
