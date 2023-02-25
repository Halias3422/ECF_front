import axios, { AxiosError } from 'axios';

export const postDataToAPI = async (endpointUrl: string, data: any) => {
  try {
    await axios.post(process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl, data);
  } catch (error) {
    handleAPIError(error as AxiosError);
  }
};

export const getDataFromAPI = async (endpointUrl: string, data?: any) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACK_END_URL + endpointUrl,
      data ? data : null
    );
    return response.data;
  } catch (error) {
    handleAPIError(error as AxiosError);
    return null;
  }
};

// need to secure alert() call in case of it not being defined

const handleAPIError = (error: AxiosError) => {
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
