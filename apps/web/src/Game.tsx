import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Container, Flex, Heading} from "@chakra-ui/react";
import {useGame} from "@game/use-game-hook";
import {useStore} from "@game/client-state";
import GameRoom from "./Components/GameRoom";

function Game() {
  const navigate = useNavigate();
  const {room, player, players, gameStarted} = useGame(navigate);
  const {currentPlayer} = useStore((state) => state);

  useEffect(() => {
    if (!room) {
      navigate('/')
    }
  }, [room])

  if (!room || !players || !player) {
    navigate('/');
    return null;
  }

  if (gameStarted === false) {
    return (
      <GameRoom/>
    )
  }

  return (
    <main style={{backgroundColor: 'lightsalmon'}}>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center" gap={10}>
          <Heading size="3xl" mb={10}>Game started</Heading>
          {currentPlayer && currentPlayer.sessionId === player.sessionId ? (
            <Heading size="xl">It's your turn</Heading>
          ) : (
            <Heading size="xl">It's not your turn</Heading>
          )}
        </Flex>
      </Container>
    </main>
  )
}

export default Game
