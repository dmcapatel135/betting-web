import axios from 'axios';
import Cookies from 'js-cookie';

const responseFormatter = (status, data, error) => {
  return { status, data, error };
};

export const postApiReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 403) {
        Cookies.remove('userIsLoggedIn');
        window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const deleteApiReq = async (url) => {
  const route_url = API_URL + url;
  return await axios
    .delete(route_url, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        Cookies.remove('userIsLoggedIn');
        window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const patchApiReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .patch(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        Cookies.remove('userIsLoggedIn');
        window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getApiReq = async (url) => {
  const token = Cookies.get('userIsLoggedIn');
  const route_url = API_URL + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e.response.status === 401) {
        Cookies.remove('userIsLoggedIn');
        window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getFileUrl = async (data) => {
  var fileInfo = {};
  await postApiReq('/upload', data)
    .then((res) => {
      fileInfo = res;
    })
    .catch((e) => {
      console.log(e);
    });

  return fileInfo;
};

export const postReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getReq = async (url) => {
  const route_url = API_URL + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const putApiReq = async (url, data) => {
  const route_url = API_URL + url;
  return await axios
    .put(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        Cookies.remove('userIsLoggedIn');
        window.location.href = '/';
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
