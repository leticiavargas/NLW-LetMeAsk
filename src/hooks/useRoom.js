import { useState, useEffect } from "react";

import { database } from '../services/firebase';
import { useAuth } from "./useAuth";

const useRoom = (roomId) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions)
        .map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
          }
        });

      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    })

    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);

  return { questions, title }
}

export { useRoom }