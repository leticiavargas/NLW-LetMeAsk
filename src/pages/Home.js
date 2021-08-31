import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';


const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');


  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new')

  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();

    if (roomCode.trim === '')
      return
    console.log("dentro do handlejoin");
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return
    }
   
    history.push(`/rooms/${roomCode}`);
  }

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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="digite o código da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export { Home }