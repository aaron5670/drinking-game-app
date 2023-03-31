import {Text} from "tamagui";
import React from "react";
import Card from "./Card";
import CardTitle from "./CardTitle";

const GameRoomCard = ({title, currentPlayers, maxPlayers}) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <Text>
        Players: {currentPlayers}/{maxPlayers}
      </Text>
    </Card>
  );
};

export default GameRoomCard;
