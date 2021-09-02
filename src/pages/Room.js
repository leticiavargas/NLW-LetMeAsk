import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../hooks/useAuth';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';


const Room = () => {

  const { user } = useAuth();
  const params = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const parsedQuestions = Object.entries(databaseRoom.questions ?? {})
        .map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          }
        })
      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    })

  }, [roomId]);

  async function handleSendQuestion(e) {
    e.preventDefault();

    if (newQuestion.trim() == '') return;

    if (!user) {
      throw new Error("you need to be logged");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeask" />
          <RoomCode roomCode={params.id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            ) }
            
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}

export { Room }