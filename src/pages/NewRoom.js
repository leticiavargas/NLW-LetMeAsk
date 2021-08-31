import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button';

import { database } from '../services/firebase';

import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { useAuth } from '../hooks/useAuth';

const NewRoom = () => {
  const {user} = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if(newRoom.trim() === '') 
      return

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="digite o nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
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