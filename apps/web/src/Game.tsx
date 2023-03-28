import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {useGame} from "@game/use-game-hook";
import {useStore} from "@game/client-state";
import GameRoom from "./Components/GameRoom";
import * as Colyseus from "colyseus.js";
import LoadingSpinner from "./Components/LoadingSpinner";

const client = new Colyseus.Client(import.meta.env.VITE_COLYSEUS_SERVER_URL);

function Game() {
  const navigate = useNavigate();
  const {room, player} = useGame(navigate);
  const {players, gameState, setRoom} = useStore((state) => state);
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
            <LoadingSpinner message={"Generating some questions..."}/>
          )}

          {gameState?.gameStatus === "ready" && (
            <Card align='center'>
              <CardHeader textAlign="center">
                <Heading fontSize="2xl">{gameState?.questions?.[0].question}</Heading>
              </CardHeader>
              <CardFooter justifyContent="space-around">
                {players.filter((p) => p.sessionId !== player.sessionId).map((p) => (
                  <Button key={p.sessionId} size="lg" colorScheme='whatsapp'>{p.username}</Button>
                ))}
              </CardFooter>
            </Card>
          )}
        </Flex>
      </Container>
    </main>
  )
}

export default Game
