import React, {useEffect, useState} from 'react'
import * as Colyseus from "colyseus.js";
import {useNavigate} from "react-router-dom";
import {useStore} from "@game/client-state";
import {RoomAvailable} from "colyseus.js";
import {
  Box,
  Card,
  CardBody,
  CardHeader, Center,
  Container,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import CreateGameModal from "./Components/CreateGameModal";

import './style.css';

const client = new Colyseus.Client('ws://localhost:2567');

function Lobby() {
  const {setRoom} = useStore((state) => state)
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState<Colyseus.RoomAvailable[]>([]);

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
    <main style={{backgroundColor: 'blanchedalmond'}}>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
          <Heading size="3xl">Lobby</Heading>

          <Card m={20}>
            <CardHeader>
              <Heading size='md'>Games</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider/>} spacing='4'>
                {allRooms.map((room) => {
                  return (
                    <Box key={room.roomId} onClick={() => joinRoom(room)} width={300} className="game-room-item">
                      <Heading size='xs' textTransform='uppercase'>
                        {room.metadata.givenRoomName}
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        Currently {room.clients} of {room.maxClients} players are in the room
                      </Text>
                    </Box>
                  )
                })}

                {allRooms.length === 0 && (
                  <Box width={300}>
                    <Heading size='xs' textTransform='uppercase'>
                      No games found
                    </Heading>
                    <Text pt='2' mb="8" fontSize='sm'>
                      Create your game and invite your friends!
                    </Text>
                    <Center>
                      <CreateGameModal createGameRoom={createGameRoom}/>
                    </Center>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>

          {allRooms.length > 0 && (
            <Card>
              <CardBody w={500}>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Text>Do you want your own game room?</Text>
                  <CreateGameModal createGameRoom={createGameRoom}/>
                </Flex>
              </CardBody>
            </Card>
          )}
        </Flex>
      </Container>
    </main>
  )
}

export default Lobby
