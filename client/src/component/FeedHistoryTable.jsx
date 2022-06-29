import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const FeedHistoryTable = () => {
  const [data, setData] = useState(null);
  const [marketDates, setMarketDates] = useState({});
  const navigate = useNavigate();

  const date = window.location.pathname.split('/').pop();

  let usedTime = [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/feed/${date}`); //test
      setData(res.data);
      console.log(res.data);

      const res2 = await axios.get('http://localhost:3000/market_dates');
      setMarketDates(res2.data);
    };
    fetchData();
  }, [date]);
  if (!data || !marketDates) return <p>Loading ... </p>;
  return (
    <Container className="d-flex ">
      <div
        className="border shadow-sm mt-3  d-flex flex-column mr-2 "
        style={{ minWidth: '120px', marginRight: '15px' }}
      >
        <p className="p-2">Date</p>
        {marketDates &&
          Object.keys(marketDates).map((marketDate) => {
            return (
              <Button
                onClick={() => navigate(`/history/${marketDate}`)}
                variant="light"
              >
                {marketDate}
                <span class="badge bg-secondary">
                  {marketDates[marketDate]} updates
                </span>
              </Button>
            );
          })}
      </div>
      <div className="border shadow-sm mt-3 p-3">
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
                    {d.map((s, j) => {
                      if (j < 8)
                        return (
                          <td>
                            {s.code} / {s.name}
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default FeedHistoryTable;
