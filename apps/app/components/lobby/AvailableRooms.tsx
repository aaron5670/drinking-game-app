import React from "react";
import {ScrollView} from "tamagui";
import GameRoomCard from "./game-room-card/GameRoomCard";

const AvailableRooms = ({ rooms }) => (
  <ScrollView
    flexGrow={1}
    contentContainerStyle={styles.availableRoomsContainer}
  >
    {rooms?.map((room) => (
      <GameRoomCard
        key={room.roomId}
        room={room}
        title={room.metadata.gameRoomName}
        currentPlayers={room.clients}
        maxPlayers={room.maxClients}
      />
    ))}
  </ScrollView>
);

const styles = {
  availableRoomsContainer: {
    flexGrow: 1,
  },
};

export default AvailableRooms;
