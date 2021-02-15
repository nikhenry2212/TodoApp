import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import img from './img/logo-certa.png';

import { autenticar } from '../../services/usuarios';
import { ID_TOKEN } from '../../constants/geral';

const Login = props => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  if(localStorage.getItem(ID_TOKEN)){
    console.log('====================================');
    console.log('Tem localStorage');
    console.log('====================================');
    history.push('/todos')
  }else{
    console.log('Não tem LocalStorage');
  }

  const logar = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const body = { email: email, senha: senha };
    const res = await autenticar(body);
    // tratar o retorno para saber se loga o usuarios
    if (res.status === true) {
      // gravar o usuario no localstorage
      localStorage.setItem(ID_TOKEN, true);
      history.push("/todos")
    }else{
      alert(res.msg)
    }
  }

  return (
    <div className="paginaLogin">

      <form onSubmit={logar}>
        <img src={img} alt="logo" className="logo" />
        <h3>LOGIN</h3>
        <div className="campo">
          <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" />
        </div>
        <div className="campo">
          <input type="password" name="senha" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Senha" />
        </div>
        <div className="campo">
          <button type="submit">Logar</button>
        </div>
        <div className="campo esqueceu-senha">
          Esqueceu a senha?
        </div>
        <div className="campo sem-cadastro">
          Ainda não tem Cadastro? Clique aqui
        </div>
      </form>
    </div>
  );
}
export default Login;