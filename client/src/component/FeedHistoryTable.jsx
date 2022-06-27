import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';

const FeedHistoryTable = () => {
  const [data, setData] = useState(null);

  const date = window.location.pathname.split('/').pop();

  let usedTime = [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/feed/${date}`); //test
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);
  if (!data) return <p>Loading ... </p>;
  return (
    <Container className="border shadow-sm mt-3 p-3">
      <p>
        Feed histories on{' '}
        {Object.values(data)[0][0].market_date.date.split(' ')[0]}
      </p>
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
              let time = d[0].market_date.date.split(' ')[1];
              if (usedTime.includes(time)) return;
              usedTime.push(time);

              return (
                <tr index={i}>
                  <td>{time}</td>
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
