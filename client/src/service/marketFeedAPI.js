import axios from 'axios';

const domain = process.env.REACT_APP_DOMAIN || 'http://localhost:3000';

export const getMarketFeedByDate = async (date) => {
  const res = await axios.get(`${domain}/feed/${date}`); //test
  return res.data;
};

export const getAllMarketDates = async () => {
  const res = await axios.get(`${domain}/market_dates`);
  return res.data;
};

export const getCurrentMarketFeed = async () => {
  const res = await axios.get(`${domain}/feed/current`);
  return res.data;
};
