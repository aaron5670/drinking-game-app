import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import useStore from "./store/useStore";
import {Player} from "colyseus-schema";
import {Container, Flex, Heading } from "@chakra-ui/react";
import GameRoom from "./Components/GameRoom";

function Game() {
  const {room, player, players, gameStarted, setPlayer, setPlayers, addPlayer, removePlayer, startGame} = useStore((state) => state);
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
        startGame();
      });
    } else {
      return navigate("/");
    }
  }, [room])

  if (!room || !players || !player) {
    return null;
  }

  if (gameStarted === false) {
    return (
      <GameRoom />
    )
  }

  return (
    <main style={{backgroundColor: 'lightsalmon'}}>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center" gap={10}>
          <Heading size="3xl" mb={10}>Game started</Heading>
        </Flex>
      </Container>
    </main>
  )
}

export default Game
