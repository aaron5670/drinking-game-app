import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Spinner,
  Text
} from "@chakra-ui/react";
import {useGame} from "@game/use-game-hook";
import {useStore} from "@game/client-state";
import GameRoom from "./Components/GameRoom";
import * as Colyseus from "colyseus.js";

const client = new Colyseus.Client('ws://localhost:2567');

function Game() {
  const navigate = useNavigate();
  const {room, player} = useGame(navigate);
  const {gameState, setRoom} = useStore((state) => state);
  const {roomId} = useParams();

  useEffect(() => {
    if (roomId && !room) {
      client.joinById(roomId, {username: `user-${Math.floor(Math.random() * 999)}`})
        .then(room => setRoom(room))
        .catch((e) => {
          console.log(e)
          navigate('/')
        });
    }
  }, [room, roomId])

  if (!room || !player) {
    return null;
  }

  if (gameState?.gameStarted === false) {
    return (
      <GameRoom/>
    )
  }

  return (
    <main>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center" gap={10}>
          <Heading size="3xl" mb={10} color="white">Game started</Heading>
          {gameState?.gameStatus === "generatingQuestions" && (
            <>
              <Spinner
                thickness='4px'
                speed='0.65s'
                color='white'
                size='xl'
              />
              <Text fontSize="2xl" color="white">Generating some questions...</Text>
            </>
          )}

          {gameState?.gameStatus === "ready" && (
            <>
              {gameState?.currentPlayer && gameState?.currentPlayer.sessionId === player.sessionId ? (
                <>
                  <Card align='center' w={500}>
                    <CardHeader>
                      <Heading>{gameState?.questions[0]?.category}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text size='md' textAlign="center">{decodeURIComponent(gameState?.questions[0]?.question)}</Text>
                    </CardBody>
                    <CardFooter w={500} justifyContent="space-around">
                      <Button size="lg" colorScheme='whatsapp'>True</Button>
                      <Button size="lg" colorScheme='red'>False</Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <Heading size="xl" color="white">It's not your turn</Heading>
              )}
            </>
          )}
        </Flex>
      </Container>
    </main>
  )
}

export default Game
