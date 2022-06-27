import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';

const FeedHistoryTable = () => {
  const [data, setData] = useState(null);

  const date = window.location.pathname.split('/').pop();

  console.log(date);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/feed/${date}`); //test
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);
  if (!data) return <p>Loading ... </p>;
  return (
    <Container className="border shadow-sm mt-3">
      <Table responsive="xl">
        <thead>
          <tr>
            <th>Time</th>
            <th>Slot 1</th>
            <th>Slot 2</th>
            <th>Slot 3</th>
            <th>Slot 4</th>
            <th>Slot 5</th>
            <th>Slot 6</th>
            <th>Slot 7</th>
            <th>Slot 8</th>
          </tr>
        </thead>
        <tbody>
          {!!data &&
            Object.values(data).map((d, i) => {
              return (
                <tr index={i}>
                  <td>{d[0].market_date.date.split(' ')[1]}</td>
                  {d.map((s) => (
                    <td>
                      {s.code} / {s.name}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default FeedHistoryTable;
