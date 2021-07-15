import { useParams, useHistory } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import { database } from '../services/firebase'

import '../styles/room.scss'
import { useRoom } from '../Hooks/useRoom'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const roomId = useParams<RoomParams>().id;
  const { title, questions } = useRoom(roomId);

  const history = useHistory();

  async function hanldeEndRoom() {
    if ( window.confirm(`Tem certeza que você deseja fechar a sala ${title}?`)) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })

      history.push('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if ( window.confirm('Tem certeza que você deseja excluir essa perguta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }
  
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }
  
  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo Let Me Ask" />
          <div>
            <RoomCode />
            <Button isOutlined
              type="button"
              onClick = {() => hanldeEndRoom()}
            >
              Fechar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala { title }</h1>
          {questions && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          { questions.map( question => {
            return (
              <Question
                key={ question.id }
                content={ question.content }
                author={ question.author }
                isAnswered={ question.isAnswered }
                isHighlighted={ question.isHighlighted }
              >
                { !question.isAnswered && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={ checkImg } alt="Marcar pergunta como Respondida" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={ answerImg } alt="Dar destaque a pergunta" />
                    </button>  
                  </>
                )}
                <button 
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={ deleteImg } alt="Remover pergunta" />
                </button>  
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
}
