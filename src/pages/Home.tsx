import { useHistory } from 'react-router'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { useAuthContext } from '../Hooks/useAuthContext'
import { FormEvent, useState } from 'react'

import { Button } from '../components/Button'

import '../styles/auth.scss'
import { database } from '../services/firebase'

export function Home() {
  const history = useHistory();
  const AuthContext = useAuthContext();
  const { signInWithGoogle } = AuthContext
  const [ room, setRoom ] = useState('')

  async function HandleLogin() {
    await signInWithGoogle();
    
    history.push("/rooms/new")
  }

  async function HandleJoinRoom(event: FormEvent) {
    event.preventDefault();
    
    const roomRef = await database.ref(`rooms/${ room }`).get()

    if ( !roomRef.exists()) 
    {
      alert('Room does not exist')
      return;
    }
    
    
    if ( roomRef.val().endedAt ) 
    {
      alert('Room already closed')
      return;
    }

    if ( room.trim() === '')
    {
      throw new Error('Room Does not exist')
    }

    history.push(`/rooms/${ room }`)
  }

  return (
    <div id="page-auth">
      <aside> 
        <img src={ illustrationImg } alt="Ilustração simbolizando troca de perguntas" /> 
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logoImg } alt="Logo" />
          <button onClick={ HandleLogin } className="create-room">
            <img src={ googleIconImg } alt="Criar sala com Google" />
            Crie sua sala com o Google 
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit = { HandleJoinRoom }>
            <input
              type="text"
              placeholder="Digite o Codigo da sala"
              onChange={ event => setRoom(event.target.value) }
              value={ room }
            />
            <Button type="submit">
              Entrar na Sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}