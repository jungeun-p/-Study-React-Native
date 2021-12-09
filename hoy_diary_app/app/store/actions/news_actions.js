import axios from 'axios';
import {GET_COVID} from '../types';

export const requestCovid = async (today, yesterday) => {
  let key =
    '71FJMe%2BlAmxH%2Bq3UvkJwOp1L2Jje6JRyZjI4ZS6BmwBmonwDhB%2Fv2%2FlRspGYVx5xA4a7eVdjEFfpMy7T82ArFA%3D%3D';
  const request = await axios
    .get(
      `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${key}&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
    )
    .then(response => {
      const data = response.data;
      return data;
    })
    .catch(error => {
      console.log(error);
      return 'error';
    });
  return {
    type: GET_COVID,
    payload: request,
  };
};
