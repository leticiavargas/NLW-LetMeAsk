import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';

import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import { useAuth } from '../hooks/useAuth';


const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();


  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new')

  };

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export { Home }