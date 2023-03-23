import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Player} from "colyseus-schema";
import useStore from "../store/useStore";

function useGame() {
  const {
    room, player, players, gameStarted, setPlayer, setPlayers, addPlayer, removePlayer, startGame
  } = useStore((state) => state);
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
          console.log('Host left the room')
          setPlayers([]);
          room.leave().then(() => navigate('/'))
        }
      }

      // when the host starts the game
      room.onMessage("startGame", (message) => {
        console.log(message);
        startGame();
      });
    } else {
      return navigate("/");
    }
  }, [room])

  return [room, player, players, gameStarted];
}

export default useGame
