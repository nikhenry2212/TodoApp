import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom';

import { carregaTodos, concluirTodo, excluirTodo, adicionarTodo, editarTodo } from './../../services/todos';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as add, faTrashAlt as lixeira, faPencilAlt as editButton } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaRealizada } from '@fortawesome/free-regular-svg-icons';
import { ID_TOKEN } from '../../constants/geral';


const Home = props => {

  const [tarefas, setTarefas] = useState([]);
  const [valorInput, setValorInput] = useState("");
  const history = useHistory();

  const carregarTarefas = useCallback(async () => {
    const tarefasInicial = await carregaTodos();
    setTarefas(tarefasInicial);
  }, []);

  useEffect(() => {
    // console.log(Date.now());
    carregarTarefas();
  }, [carregarTarefas]);

  const concluirTarefa = async (tarefa) => {

    const tarefas = await concluirTodo(tarefa);

    setTarefas(tarefas);
  }

  const excluirTarefa = async (tarefa) => {
    const res = await excluirTodo(tarefa);
    if(res.status){
      carregarTarefas();
      }else{
      alert(res.msg)
     }

  }
  const adicionarTarefa = async (e) => {

    if (e) {
      e.preventDefault();
    }

    if (valorInput.length > 0) {

      const tarefa = {
        descricao: valorInput.toUpperCase(),
      }

      const res = await adicionarTodo(tarefa)
      if(res.status){
        carregarTarefas();
      }else{
        alert(res.msg)
      }
       setValorInput("");
    } else {
      alert('Digite algo Idiota!')
    }

  }

  const editarTarefa = async (tarefa) => {
   // eslint-disable-next-line no-unused-vars
   // eslint-disable-next-line no-const-assign
   const novaTarefa =  { descricao: prompt(`Digite a nova descrição: ${tarefa.descricao}`, tarefa.descricao.toUpperCase()) }
   
   if(novaTarefa.descricao !== null && novaTarefa.descricao !== undefined && novaTarefa.descricao.length > 0){
     tarefa.descricao = novaTarefa.descricao;
     const res = await editarTodo(tarefa);
      if(res.status){
      carregarTarefas();
      }else{
      alert(res.msg)
     }
    
   }
 
}

  const renderTarefas = () => {
    return tarefas.map(tarefa => {

      return (
        <li key={tarefa._id}>
          <div className="tarefa">
            {tarefa.concluida && <div className="situacao ok " onClick={() => { (concluirTarefa(tarefa)) }}><Icon icon={tarefaRealizada} /></div>}
            {!tarefa.concluida && <div className="situacao" onClick={() => { (concluirTarefa(tarefa)) }}><Icon icon={tarefaPendente} /></div>}
            {/* {!tarefa.editar && <div className="editar" onClick={() => { (editarTarefa(tarefa)) }}><Icon icon={caneta} /></div>} */}

            <div className="descricao">{tarefa.descricao}</div>
          </div>
          <div className="elementos">
            <div className="editar" onClick={() => editarTarefa(tarefa)}><Icon icon={ editButton} /></div>
            <div className="excluir" onClick={() => excluirTarefa(tarefa)}><Icon icon={lixeira} /></div>
          </div>
        </li>
      )

    })
  }
  const logout = () => {
    localStorage.removeItem(ID_TOKEN);
    history.push('/')
  }



  return (
    
    <div className="TodoApp">
      <div><button className="btn-logout" onClick={() => logout()}>Logout</button></div>
      <div className="titulo">Todo App</div>
      <div className="todos">
        <div className="novoTodo">
          <form onSubmit={adicionarTarefa}>
            <input type="text" placeholder="Nome da tarefa" value={valorInput} onChange={(event) => setValorInput(event.target.value)} />

            <button type="button" onClick={() => adicionarTarefa()}><Icon icon={add} /></button>
          </form>
        </div>
        <div className="lista">
          <ul>
            {renderTarefas()}
          </ul>
        </div>
      </div>
    </div >
  )
}
export default Home;