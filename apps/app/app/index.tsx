import React, { useState } from "react";
import { YStack } from "@tamagui/stacks";
import { Button } from "tamagui";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";
import useAvailableRooms from "../hooks/useAvailableRooms";
import useCreateGameRoom from "../hooks/useCreateRoom";
import AvailableGamesTitle from "../components/lobby/AvailableGamesTitle";
import Header from "../components/lobby/Header";
import Footer from "../components/lobby/Footer";
import CreateRoomDialog from "../components/lobby/CreateRoomDialog";
import GradientBackground from "../components/lobby/GradientBackground";
import AvailableRooms from "../components/lobby/AvailableRooms";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

export default function Home() {
  const allRooms = useAvailableRooms(client);
  const createGameRoom = useCreateGameRoom(client);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <YStack flex={1}>
      <GradientBackground>
        <YStack flex={1}>
          <Header>
            <AvailableGamesTitle>Available Games</AvailableGamesTitle>
          </Header>
          <AvailableRooms rooms={allRooms} />
          <Footer>
            <Button theme="green" w="$16" onPress={() => setIsModalOpen(true)}>
              Create Game Room
            </Button>
          </Footer>
        </YStack>
      </GradientBackground>
      <CreateRoomDialog
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        onCreateRoom={createGameRoom}
      />
    </YStack>
  );
}
