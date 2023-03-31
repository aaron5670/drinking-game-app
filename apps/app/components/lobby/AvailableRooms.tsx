import {ScrollView} from "tamagui";
import GameRoomCard from "./game-room-card/GameRoomCard";
import React from "react";

const AvailableRooms = ({ rooms }) => (
  <ScrollView
    flexGrow={1}
    contentContainerStyle={styles.availableRoomsContainer}
  >
    {rooms?.map((room) => (
      <GameRoomCard
        key={room.roomId}
        title={room.metadata.gameRoomName}
        currentPlayers={room.clients}
        maxPlayers={room.maxClients}
      />
    ))}
    <GameRoomCard
      title="Test room (#1)"
      currentPlayers={3}
      maxPlayers={8}
    />
  </ScrollView>
);

const styles = {
  availableRoomsContainer: {
    flexGrow: 1,
    padding: 16
  },
};

export default AvailableRooms;
