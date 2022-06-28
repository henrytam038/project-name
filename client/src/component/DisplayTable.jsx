import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

const DisplayTable = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/feed/current');

      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading ... </p>;
  return (
    <Container className="border shadow-sm mt-3 p-3">
      <>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p>Current Feed</p>
            {data.length !== 0 && (
              <p>Last updated {data[0].market_date.date}</p>
            )}
          </div>
          <Button variant="light" style={{ height: '30px' }}>
            <Link to="/history/2022-06-27">See feed details</Link>
          </Button>
        </div>
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
            {data.length !== 0 &&
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
      </>
    </Container>
  );
};

export default DisplayTable;
