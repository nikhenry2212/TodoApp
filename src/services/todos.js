import axios from'axios';
import {API_URL} from './../constants/services'

const carregaTodos = async () => {
  const res = await axios.get(`${API_URL}todos`);
  return res.data;
}

const concluirTodo = async(tarefa)=> {
  const res = await axios.get(`${API_URL}todos/concluir/${tarefa._id}`);
  return res.data;
}

const excluirTodo = async (tarefa) => {
  tarefa.deletado = true;
  const res = await axios.put(`${API_URL}todos/${tarefa._id}`, tarefa);
  return res.data;
}

const adicionarTodo = async (tarefa) => {
  const res = await axios.post(`${API_URL}todos`, tarefa);
  return res.data;
  
}
const editarTodo = async (tarefa) => {
  const res = await axios.put(`${API_URL}todos/`+tarefa._id, tarefa);
  return res.data;  
}
export {carregaTodos, concluirTodo, excluirTodo, adicionarTodo, editarTodo}