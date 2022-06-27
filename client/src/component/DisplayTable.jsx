import React from 'react';
import Table from 'react-bootstrap/Table';

const DisplayTable = ({ data }) => {
  console.log(data);
  if (!data) return <p>Loading ... </p>;
  return (
    <>
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
    </>
  );
};

export default DisplayTable;
