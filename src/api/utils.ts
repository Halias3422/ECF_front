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

const handleAPIError = (error: AxiosError) => {
  if (error.response) {
    alert(
      'Erreur: le serveur a répondu avec le code ' +
        error.response.status +
        ': \n' +
        JSON.stringify(error.response.data)
    );
  } else if (error.request) {
    alert('Erreur: le serveur ne répond pas.');
  } else {
    alert('Erreur inattendue: ' + error.message);
  }
};
