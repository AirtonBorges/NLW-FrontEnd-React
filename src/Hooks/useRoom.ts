import { useEffect, useState } from "react";
import { database } from "../services/firebase";

import { useAuthContext } from "../Hooks/useAuthContext";

type QuestionType = {
  id: string,
  
  author: {
    name: string;
    avatar: string
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string) {
  const [ title, setTittle ] = useState('');
  const [ questions, setQuestions ] = useState<QuestionType[]>([]) 
  const { user } = useAuthContext()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${ roomId }`);
  
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const databaseQuestions:FirebaseQuestions = databaseRoom.questions || {};

      const parsedQuestions = Object.entries(databaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })

      setTittle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
    
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id])

  return { questions, title }
}