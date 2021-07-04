import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import { useAuthContext } from '../Hooks/useAuthContext'

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuthContext();
  const [ newRoom, setNewRoom ] = useState(''); 
  const history = useHistory();

  async function handleNewRoom(event: FormEvent) {
    event.preventDefault();
    
    const roomRef = database.ref('rooms');
    
    if (newRoom.trim() === '') {
      throw new Error("Not a valid Room name")
    }
    
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${ firebaseRoom.key }`)
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
          <h2>Criar uma Nova Sala</h2>
          <form onSubmit={ handleNewRoom }>
            <input
              type="text"
              placeholder="Digite o Codigo da sala"
              onChange={ event => setNewRoom(event.target.value) }
              value = { newRoom }
            />
            <Button type="submit">
              Entrar na Sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}