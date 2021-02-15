import axios from 'axios';
import {API_URL} from './../constants/services';

const autenticar = async (body) => {
  const res = await axios.post(`${API_URL}usuarios/autenticar`, body);
  return res.data;
}
export {autenticar};
