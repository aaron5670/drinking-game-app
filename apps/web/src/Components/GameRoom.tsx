import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import React from "react";
import useStore from "../store/useStore";
import {useNavigate} from "react-router-dom";

const GameRoom = () => {
  const {room, player, players, setPlayers, setRoom, setPlayer} = useStore((state) => state);
  const navigate = useNavigate();

  const leaveRoom = () => {
    try {
      return room.leave();
    } catch (e) {
      console.log(e);
    } finally {
      setPlayers([]);
      setPlayer(null);
      setRoom(null);
      navigate('/');
    }
  }

  return (
    <main style={{backgroundColor: 'lightcoral'}}>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center" gap={10}>
          <Heading size="3xl" mb={10}>Game room</Heading>
          <Card>
            <CardHeader>
              <Heading size='md'>Players</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider/>} spacing='4'>
                {players.map((player) => {
                  return (
                    <Box key={player.sessionId} width={300}>
                      <Text fontSize='sm'>
                        {player.username}
                      </Text>
                    </Box>
                  )
                })}
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody w={600}>
              <Flex justifyContent='space-between' alignItems='center'>
                {player.isHost && <Button onClick={() => room.send('startGame')} colorScheme="whatsapp">Start game</Button>}
                {player.isHost ? (
                  <Text>You are the host of this room</Text>
                ) : (
                  <Text>Do you want to leave the room?</Text>
                )}
                <Button onClick={leaveRoom} colorScheme="red">Leave room</Button>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </main>
  )
}

export default GameRoom
