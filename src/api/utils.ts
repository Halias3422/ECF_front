import axios, { AxiosError } from 'axios';

export const postDataToAPI = async (endpointUrl: string, data: any) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl,
      data
    );
    return res;
  } catch (error) {
    return (error as AxiosError)?.response;
  }
};

export const postProtectedDataToAPI = async (
  endpointUrl: string,
  data: any,
  headers: string,
  contentType?: string
) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl,
      data,
      {
        headers: {
          Authorization: headers,
          ...(contentType ? { 'Content-Type': contentType } : {}),
        },
      }
    );
    return res;
  } catch (error) {
    return (error as AxiosError)?.response;
  }
};

export const getDataFromAPI = async (endpointUrl: string, params?: any) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl,
      {
        params: {
          ...params,
        },
      }
    );
    if (params) {
      return response;
    }
    return response.data;
  } catch (error) {
    return (error as AxiosError)?.response;
  }
};

export const getProtectedDataFromAPI = async (
  endpointUrl: string,
  header: string
) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl,
      {
        headers: {
          Authorization: `${header}`,
        },
      }
    );
    return response;
  } catch (error) {
    return (error as AxiosError)?.response;
  }
};
