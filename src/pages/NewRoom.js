import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { useAuth } from '../hooks/useAuth';

const NewRoom = () => {
  const {user} = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMe Ask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="digite o nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export { NewRoom }