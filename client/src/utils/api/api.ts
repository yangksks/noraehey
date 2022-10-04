import axios from 'axios';

const getAccessToken = () => {
  console.log('getAccessToken');

  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken;
};
const getLocalRefreshToken = () => {
  console.log('getLocalRefreshToken');

  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
  console.log('setRefreshToken');
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeRefreshToken = () => {
  console.log('removeRefreshToken');
  localStorage.removeItem('refreshToken');
};

export const removeAccessToken = () => {
  console.log('removeAccessToken');
  sessionStorage.removeItem('accessToken');
};

const getNewAccessToken = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const refreshtoken = getLocalRefreshToken();
  console.log('getNewAccessToken');
  const result = await axios.get(`${baseURL}api/v1/member/refresh`, {
    headers: {
      'REFRESH-TOKEN': `${refreshtoken}`,
    },
  });
  return result;
};

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.data?.error === 'TokenExpiredException'
      ) {
        console.log('int1');
        try {
          console.log('int2try');
          const response = await getNewAccessToken();
          console.log('int3try');
          console.log(response);
          const { accessToken, refreshToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          setRefreshToken(refreshToken);
          console.log('int4try');
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (err: any) {
          console.log('int2catch');
          if (
            err.response.status === 401 &&
            err.response.data?.message === 'REFRESH_ERROR'
          ) {
            removeAccessToken();
            removeRefreshToken();
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
            return;
          }
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export const fetchData = {
  get: async (url: string, option?: any) => await instance.get(url, option),
  post: async (url: string, body?: any, option?: any) =>
    await instance.post(url, body, option),
  put: async (url: string, body?: any, option?: any) =>
    await instance.put(url, body, option),
  patch: async (url: string, body?: any, option?: any) =>
    await instance.patch(url, body, option),
  delete: async (url: string, option?: any) =>
    await instance.delete(url, option),
};
