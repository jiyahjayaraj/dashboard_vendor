import appConfig from '../config';
import { toast } from 'react-toastify';

const commonApi = async ({ api, method, body, authorization, token }) => {
  let headers = { Accept: 'application/json' };
  if (authorization === 'Bearer') headers.Authorization = `Bearer ${token}`;
  if (!(body instanceof FormData)) headers['Content-Type'] = 'application/json';

  const response = await fetch(api, {
    method,
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
    credentials: 'include'
  });

  console.log("response",response);
  

  if (!response.ok) {
    if (response.status === 401) {
      toast.error('Session expired');
      window.location.href = '/login';
      return;
    }
    throw await response.json();
  }
  return response.status === 204 ? {} : await response.json();
};

export default commonApi;