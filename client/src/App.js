import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayTable from './component/DisplayTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/result');
      setData(res);
    };
    console.log(data);
    fetchData();
  }, []);
  return <div className="App">{data && <DisplayTable data={data} />}</div>;
}

export default App;
