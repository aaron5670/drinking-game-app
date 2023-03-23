import React from 'react'
import {Container, Flex, Heading } from "@chakra-ui/react";
import GameRoom from "./Components/GameRoom";
import useGame from "./hooks/useGame";

function Game() {
  const [room, player, players, gameStarted] = useGame();

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
