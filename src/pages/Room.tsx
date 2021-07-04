import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuthContext } from '../Hooks/useAuthContext'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Question = {
  id: string,
  
  author: {
    name: string;
    avatar: string
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

export function Room() {
  const [ newQuestion, setNewQuestion ] = useState('')
  const { user, signInWithGoogle } = useAuthContext()

  const roomId = useParams<RoomParams>().id;

  const [ title, setTittle ] = useState('');
  const [ questions, setQuestions ] = useState<Question[]>([]) 

  useEffect(() => {
    const roomRef = database.ref(`rooms/${ roomId }`);
  
    roomRef.on('value', room => {
      if ( !room.exists() ) {
        throw new Error("Room Does Not exist")
      }

      const databaseRoom = room.val()
      const databaseQuestions:FirebaseQuestions = databaseRoom.questions;

      const parsedQuestions = Object.entries(databaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })
      
      setTittle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId])

  async function handleNewQuestion(event: FormEvent) {
    event.preventDefault();

    if ( !user ) {
      throw new Error('You must be logged in to send a question');
    }
    
    if ( newQuestion.trim() === '') {
      alert('Cannot send empty question')
      return;
    }

    const question = {
      author: {
        name: user.name,
        avatar: user.photo 
      },

      content: newQuestion,
      isHighlighted: false,
      isAnswered: false
    }
    
    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo Let Me Ask" />
          <RoomCode />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala { title }</h1>
          {questions && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={ handleNewQuestion }>
          <textarea
            placeholder="O que vc quer perguntar"
            onChange={event => setNewQuestion(event.target.value)}
            value={ newQuestion }
          />
          
          <div className="form-footer">
              <div>
                {
                  user ? (
                    <div className="user-info">
                      <img src={ user.photo } alt={ user.name } />
                      <span>{ user.name }</span>
                    </div>
                  ) : (
                    <span className="log-in">
                    Para enviar uma pergunta, <button type='button' onClick={ signInWithGoogle }>faça seu login</button>.
                    </span> 
                  )
                }
              </div>
            <Button type="submit" disabled={!user}>
              Enviar Pergunta
            </Button>
          </div>
        </form>
        { questions }
      </main>
    </div>
  )
}