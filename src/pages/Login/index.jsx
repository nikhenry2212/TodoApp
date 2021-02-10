import React, { useState } from 'react';
import './styles.css';

const Login = props => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logar = (event) => {
    if (event) {
      event.preventDefault();
    }
    console.log('====================================');
    console.log(email, senha);
    console.log('====================================');
  }

  return (
    <div className="paginaLogin">

      <form onSubmit={logar}>
        <h3>LOGIN</h3>
        <div className="campo">
          <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" />
        </div>
        <div className="campo">
          <input type="password" name="senha" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Senha" />
        </div>
        <div className="campo">
          <button onClick={() => logar()}>Logar</button>
        </div>
        <div className="campo esqueceu-senha">
          Esquece a senha?
        </div>
        <div className="campo sem-cadastro">
          Ainda não tem Cadastro? Clique aqui
        </div>
      </form>
    </div>
  );
}
export default Login;