import {Text} from "tamagui";
import React from "react";
import Card from "./Card";
import CardTitle from "./CardTitle";
import { RoomAvailable } from "colyseus.js";
import { useRouter, useSearchParams } from "expo-router";

const GameRoomCard = ({title, room, currentPlayers, maxPlayers}) => {
  // @ts-ignore
  const {username}: {username: string} = useSearchParams();
  const router = useRouter();

  const joinRoom = (room: RoomAvailable) => {
    router.push(`/game/${room.roomId}?username=${username}`)
  };

  return (
    <Card onPress={() => joinRoom(room)}>
      <CardTitle>{title}</CardTitle>
      <Text>
        Players: {currentPlayers}/{maxPlayers}
      </Text>
    </Card>
  );
};

export default GameRoomCard;
