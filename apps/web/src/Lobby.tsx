import React, {useEffect, useState} from 'react'
import * as Colyseus from "colyseus.js";
import {useNavigate} from "react-router-dom";
import {useStore} from "@game/client-state";
import {RoomAvailable} from "colyseus.js";
import {
  Box,
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
import CreateGameModal from "./Components/CreateGameModal";

import './style.css';

const client = new Colyseus.Client(import.meta.env.VITE_COLYSEUS_SERVER_URL);

function Lobby() {
  const {setRoom} = useStore((state) => state)
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState<Colyseus.RoomAvailable[]>([]);

  useEffect(() => {
    client.getAvailableRooms("game_room").then((rooms) => {
      setAllRooms(rooms)
    });

    const timer = setInterval(() => {
      client.getAvailableRooms("game_room").then((rooms) => {
        setAllRooms(rooms)
      });
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const createGameRoom = (gameRoomName: string) => {
    client.create('game_room', {
      gameRoomName,
      username: `user-${Math.floor(Math.random() * 999)}`,
    }).then(room => {
      setRoom(room)
      navigate(`/game/${room.id}`, {state: {host: true}})
    })
  }

  const joinRoom = (room: RoomAvailable) => {
    navigate(`/game/${room.roomId}`)
  };

  return (
    <main>
      <Container>
        <Flex height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
          <Heading size="3xl" color="white">Lobby</Heading>

          <Card m={20} w={300}>
            {allRooms.length > 0 && (
              <CardHeader>
                <Heading size='md'>Games</Heading>
              </CardHeader>
            )}

            <CardBody>
              <Stack divider={<StackDivider/>} spacing='4'>
                {allRooms.map((room) => {
                  return (
                    <Box key={room.roomId} onClick={() => joinRoom(room)} className="game-room-item">
                      <Heading size='xs' textTransform='uppercase'>
                        {room.metadata.gameRoomName}
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        Currently {room.clients} of {room.maxClients} players are in the room
                      </Text>
                    </Box>
                  )
                })}

                {allRooms.length === 0 && (
                  <Box p={5} textAlign="center">
                    <Heading size='xs' textTransform='uppercase'>
                      No games found
                    </Heading>
                    <Text pt='2' mb="8" fontSize='sm'>
                      Create your game and invite your friends!
                    </Text>
                    <CreateGameModal createGameRoom={createGameRoom}/>
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
