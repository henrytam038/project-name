import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayTable from './component/DisplayTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/feed/current');
      setData(res.data);
    };
    console.log(data);
    fetchData();
  }, []);
  return (
    <Container className="App shadow-sm mt-3 pt-3 border">
      <h6>Current Feed</h6>
      {data && (
        <>
          <p>Last updated {data[0].market_date.date}</p>
          <DisplayTable data={data} />
        </>
      )}
    </Container>
  );
}

export default App;
