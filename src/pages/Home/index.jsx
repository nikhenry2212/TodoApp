import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { carregaTodos, concluirTodo, excluirTodo, adicionarTodo, editarTodo } from './../../services/todos';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as add, faTrashAlt as lixeira, faPencilAlt as caneta } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaRealizada } from '@fortawesome/free-regular-svg-icons';


const Home = props => {

  const [tarefas, setTarefas] = useState([]);
  const [valorInput, setValorInput] = useState("");

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
    const tarefas = await excluirTodo(tarefa);
    setTarefas(tarefas);

  }
  const adicionarTarefa = async (e) => {

    if (e) {
      e.preventDefault();
    }

    if (valorInput.length > 0) {

      const tarefa = {
        descricao: valorInput,
      }

      const tarefas = await adicionarTodo(tarefa)

      setTarefas(tarefas);
      setValorInput("");
    } else {
      alert('Digite algo Idiota!')
    }

  }

  const editarTarefa = async (tarefa) => {
   // eslint-disable-next-line no-unused-vars
   // eslint-disable-next-line no-const-assign
   const novaTarefa =  { descricao: prompt(`Digite novo valor para editar a tarefa: ${tarefa.descricao}`, tarefa.descricao) }
   console.log(novaTarefa);
   if(novaTarefa.descricao !== null && novaTarefa.descricao !== undefined && novaTarefa.descricao.length > 0){
     const tarefas = await editarTodo(tarefa, novaTarefa);
     console.log(tarefas);
     setTarefas(tarefas);
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
            <div className="editar" onClick={() => editarTarefa(tarefa)}><Icon icon={caneta} /></div>
            <div className="excluir" onClick={() => excluirTarefa(tarefa)}><Icon icon={lixeira} /></div>
          </div>
        </li>
      )

    })
  }

  return (
    <div className="TodoApp">
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