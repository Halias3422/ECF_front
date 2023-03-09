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

export const getDataFromAPI = async (endpointUrl: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl
    );
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
    return response.data.data.role;
  } catch (error) {
    return (error as AxiosError)?.response;
  }
};

// need to secure alert() call in case of it not being defined

const handleAdminAPIError = (error: AxiosError) => {
  if (error.response) {
    try {
      alert(
        'Erreur: le serveur a répondu avec le code ' +
          error.response.status +
          ': \n' +
          JSON.stringify(error.response.data)
      );
    } catch (e) {
      console.log(
        'Erreur: le serveur a répondu avec le code ' +
          error.response.status +
          ': \n' +
          JSON.stringify(error.response.data)
      );
    }
  } else if (error.request) {
    try {
      alert('Erreur: le serveur ne répond pas.');
    } catch (e) {
      console.log('Erreur: le serveur ne répond pas.');
    }
  } else {
    try {
      alert('Erreur inattendue: ' + error.message);
    } catch (e) {
      console.log('Erreur inattendue: ' + error.message);
    }
  }
};
