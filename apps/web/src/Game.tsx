import {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import useStore from "./store/useStore";
import {Player} from "colyseus-schema";

import './App.css'

function Game() {
  const {room, player, players, setPlayer, setPlayers, addPlayer, removePlayer} = useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (room) {
      room.onStateChange.once((state) => {
        const players = state.players.map(
          ({sessionId, username, isHost}: Player) => new Player(username, sessionId, isHost)
        );

        // find and set the current player
        const player = players.find((player: Player) => player.sessionId === room.sessionId);
        setPlayer(player);

        // set all players
        setPlayers(players);
      });

      // when a new player joins the room
      room.state.players.onAdd = ({username, sessionId, isHost}: Player) => {
        addPlayer(new Player(username, sessionId, isHost));
      };

      // when a player leaves the room
      room.state.players.onRemove = (player: Player) => {
        removePlayer(player);

        if (player.isHost) {
          console.log('host left the room')
          setPlayers([]);
          room.leave()
            .then(() => navigate('/'))
        }
      }

      // when the host starts the game
      room.onMessage("startGame", (message) => {
        console.log(message);
      });
    } else {
      return navigate("/");
    }
  }, [room])

  if (!room || !players || !player) {
    return null;
  }

  const leaveRoom = () => {
    try {
      return room.leave();
    } catch (e) {
      console.log(e);
    } finally {
      setPlayers([]);
      setPlayer(null);
      navigate('/');
    }
  }

  const startGame = () => {
    try {
      room.send('startGame');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <h1>Game</h1>
      <div className="card">
        <h3>Players</h3>
        <ul>
          {players.map((player: Player) => (
            <li key={player.sessionId}>
              {player.username}
            </li>
          ))}
        </ul>
        {player.isHost && (
          <>
            <p>You are the host</p>
            <button onClick={startGame}>
              Start game
            </button>
          </>
        )}
        <div style={{marginTop: 10}}>
          <button onClick={leaveRoom}>
            Leave room
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game
