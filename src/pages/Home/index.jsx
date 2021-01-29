import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import axios from 'axios';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as add, faTrashAlt as lixeira } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaRealizada } from '@fortawesome/free-regular-svg-icons';


const Home = props => {

  const [tarefas, setTarefas] = useState([]);
  const [valorInput, setValorInput] = useState("");

  const carregarTarefas = useCallback(async() => {

    // aqui vmamos fazer o resquest
   const res =await axios.get("http://localhost:8000/todos");
    console.log('res >>>>> ',res);
    const tarefasInicial = res.data;

    setTarefas([...tarefasInicial]);
  }, []);

  useEffect(() => {
    // console.log(Date.now());
    carregarTarefas();
  }, [carregarTarefas]);

  const concluirTarefa = (tarefa) => {
    const tarefasTemp = [...tarefas];
    const tarefaAtualizar = tarefasTemp.find(t => (t.id === tarefa.id));

    // let tarefaAtualizar;
    // for(let x=0; x < tarefasTemp.length; x++){
    //   if(tarefasTemp[x].id ===tarefa.id){
    //     tarefaAtualizar = tarefasTemp[x];
    //   }
    // }

    tarefaAtualizar.concluida = !tarefaAtualizar.concluida;
    setTarefas(tarefasTemp);
  }

  const excluirTarefa = (tarefa) => {
    const tarefasTemp = [...tarefas];
    const indiceTarefa = tarefasTemp.findIndex(t => (t.id === tarefa.id))

    tarefasTemp.splice(indiceTarefa, 1);
    setTarefas(tarefasTemp);
    // console.log(tarefasTemp);
  }
  const adicionarTarefa = (e) => {
    if(valorInput.length > 0){

      const novaTarefa = {
        id: Date.now(),
        descricao: valorInput,
        concluida: false
      }
  
  
      const tarefasTemp = [...tarefas];
  
      tarefasTemp.push(novaTarefa);
  
      setTarefas(tarefasTemp);
      setValorInput("");
    }else{
      alert('Digite algo Idiota!')
    }
    if(e){
    e.preventDefault();
  }


  }

  const renderTarefas = () => {
    return tarefas.map(tarefa => {
      return (
        <li key={tarefa.id}>
          <div className="tarefa">
            {tarefa.concluida && <div className="situacao ok " onClick={() => { (concluirTarefa(tarefa)) }}><Icon icon={tarefaRealizada} /></div>}
            {!tarefa.concluida && <div className="situacao" onClick={() => { (concluirTarefa(tarefa)) }}><Icon icon={tarefaPendente} /></div>}



            {/* {tarefa.concluida ? <div className="situacao"><Icon icon={tarefaRealizada} /></div>
                 :
                  <div className="situacao"><Icon icon={tarefaPendente} /></div>} */}

            <div className="descricao">{tarefa.descricao}</div>
          </div>
          <div className="excluir" onClick={() => excluirTarefa(tarefa)}>
            <Icon icon={lixeira} />
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