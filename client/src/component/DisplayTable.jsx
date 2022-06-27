import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';

const DisplayTable = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/feed/current');

      console.log(res.data);

      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading ... </p>;
  return (
    <Container className="border shadow-sm mt-3">
      <p>Current Feed</p>
      <p>Last updated {data[0].market_date.date}</p>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Code</th>
            <th>Type</th>
            <th>Underlying</th>
            <th>Comment</th>
            <th>Selected By</th>
          </tr>
        </thead>
        <tbody>
          {!!data &&
            data.map((d, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{d.code}</td>
                  <td>
                    {d.type === '認購' ? 'Warrant / Call' : 'Warrant / Put'}
                  </td>
                  <td>{`${d.underlying_id} ${d.name}`}</td>
                  <td>{d.comment}</td>
                  <td>{d.selected_by}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default DisplayTable;
