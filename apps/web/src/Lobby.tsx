import {useEffect, useState} from 'react'
import * as Colyseus from "colyseus.js";
import {useNavigate} from "react-router-dom";
import useStore from "./store/useStore";
import {RoomAvailable} from "colyseus.js";
import './App.css'

const client = new Colyseus.Client('ws://localhost:2567');

function Lobby() {
  const {setRoom} = useStore((state) => state)
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState<Colyseus.RoomAvailable[]>([]);
  const [roomName, setRoomName] = useState(`room-${Math.floor(Math.random() * 999)}`);

  useEffect(() => {
    client.getAvailableRooms("my_room").then((rooms) => {
      setAllRooms(rooms)
    });

    const timer = setInterval(() => {
      client.getAvailableRooms("my_room").then((rooms) => {
        setAllRooms(rooms)
      });
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const refreshRooms = () => {
    client.getAvailableRooms("my_room")
      .then((rooms) => setAllRooms(rooms));
  }

  const createGameRoom = (roomName: string) => {
    client.create('my_room', {
      roomName,
      username: `user-${Math.floor(Math.random() * 999)}`,
    }).then(room => {
      setRoom(room)
      navigate('/game')
    })
  }

  const joinRoom = (room: RoomAvailable) => {
    client.joinById(room.roomId, {username: `user-${Math.floor(Math.random() * 999)}`}).then(room => {
      setRoom(room);
      navigate('/game');
    })
  };

  return (
    <div className="App">
      <h1>Colyseus lobby</h1>
      <div className="card">
        <input name="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
        <button onClick={() => createGameRoom(roomName)}>
          Create room
        </button>
      </div>
      <h3>Current rooms</h3>
      <button onClick={refreshRooms}>Refresh rooms</button>
      {allRooms.map((room) => {
        return (
          <p key={room.roomId} onClick={() => joinRoom(room)}>
            {room.metadata.givenRoomName} ({room.clients}/{room.maxClients})
          </p>
        )
      })}
    </div>
  )
}

export default Lobby
