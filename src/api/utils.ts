import axios, { AxiosError } from 'axios';

export const postDataToAPI = async (endpointUrl: string, data: any) => {
  try {
    await axios.post(endpointUrl, data);
  } catch (error) {
    handleAPIError(error as AxiosError);
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
