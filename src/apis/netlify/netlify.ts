import axios from 'axios';

export const getNetlifyUserInformation = (accessToken: string) => {
  return axios
    .get('https://api.netlify.com/api/v1/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data.account_id;
    })
    .catch((error) => {
      console.error('Failed to fetch Netlify user information:', error);
      throw error;
    });
};

export const getNetlifyUserBuildInformation = (accountId: string, accessToken: string) => {
  return axios
    .get(`https://api.netlify.com/api/v1/${accountId}/builds/status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Failed to fetch Netlify user build information:', error);
      throw error;
    });
};

export const getNetlifyAccountSites = (accountId: string, accessToken: string) => {
  return axios
    .get(`https://api.netlify.com/api/v1/${accountId}/sites`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to fetch Netlify account sites:', error);
      throw error;
    });
};
