import React, { useState } from "react";
import { Button, H3, H6, XStack } from "tamagui";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";
import useAvailableRooms from "../../hooks/useAvailableRooms";
import useCreateGameRoom from "../../hooks/useCreateRoom";
import Footer from "../../components/lobby/Footer";
import CreateRoom from "../../components/lobby/CreateRoom";
import AvailableRooms from "../../components/lobby/AvailableRooms";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { MyStack } from "../../components/MyStack";
import { useRouter } from "expo-router";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

export default function Lobby() {
  const router = useRouter();
  const allRooms = useAvailableRooms(client);
  const createGameRoom = useCreateGameRoom(client);

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
          theme="blue_Button"
        />
        <H3>Game lobby</H3>
      </XStack>
      <H6>Create a game room, or join an existing one.</H6>
      <AvailableRooms rooms={allRooms} />
      <Footer>
        <CreateRoom onCreateRoom={createGameRoom} />
      </Footer>
    </MyStack>
  );
}
