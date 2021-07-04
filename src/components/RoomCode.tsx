import { useParams } from 'react-router-dom'

import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomParams = {
  id: string;
}

export function RoomCode() {
  
  const roomId = useParams<RoomParams>().id;

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomId)
  }


  return (
    <button className="room-code">
      <div>
        <img onClick={ copyRoomCodeToClipboard } src={ copyImg } alt="Copy room code" />
      </div>

      <span>{ roomId }</span>
    </button>
  )
}