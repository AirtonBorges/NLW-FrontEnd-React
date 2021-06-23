import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'
import '../styles/button.scss'
import '../styles/global.scss'

export function NewRoom() {
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
          <form>
            <input
              type="text"
              placeholder="Digite o Codigo da sala"
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