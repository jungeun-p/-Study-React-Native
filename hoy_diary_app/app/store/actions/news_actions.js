import axios from 'axios';
import {GET_COVID, GET_DUST} from '../types';

export const requestCovid = async (today, yesterday) => {
  let serviceKey =
    '71FJMe%2BlAmxH%2Bq3UvkJwOp1L2Jje6JRyZjI4ZS6BmwBmonwDhB%2Fv2%2FlRspGYVx5xA4a7eVdjEFfpMy7T82ArFA%3D%3D';
  const request = await axios
    .get(
      `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`,
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

export const requestDust = async () => {
  const fineDust = ['PM10', 'PM25', 'NO2'];
  const serviceKey =
    '71FJMe%2BlAmxH%2Bq3UvkJwOp1L2Jje6JRyZjI4ZS6BmwBmonwDhB%2Fv2%2FlRspGYVx5xA4a7eVdjEFfpMy7T82ArFA%3D%3D';
  for (const item of fineDust) {
    const request = await axios
      .get(
        `http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?itemCode=${item}&dataGubun=HOUR&pageNo=1&numOfRows=100&returnType=json&serviceKey=${serviceKey}`,
      )
      .then(response => {
        const data = {
          dustData: response.data,
          item: item,
        };
        return data;
      })
      .catch(error => {
        console.log(error);
        return 'err';
      });
    return {
      type: GET_DUST,
      payload: request,
    };
  }
};
