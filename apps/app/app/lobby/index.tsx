import { Button, H3, H6, XStack } from "tamagui";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ArrowLeft } from "@tamagui/lucide-icons";
import * as Colyseus from "colyseus.js/dist/colyseus";
import useAvailableRooms from "../../hooks/useAvailableRooms";
import Footer from "../../components/lobby/Footer";
import CreateRoom from "../../components/lobby/CreateRoom";
import AvailableRooms from "../../components/lobby/AvailableRooms";
import { MyStack } from "../../components/MyStack";
import { useEffect } from "react";
import { useGame } from "@game/use-game-hook";
import { useStore } from "@game/client-state";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

export default function Lobby() {
  const router = useRouter();
  const allRooms = useAvailableRooms(client);
  const { room } = useGame(router.push);
  const { resetGame } = useStore((state) => state);

  useEffect(() => {
    if (room) {
      room.leave();
      resetGame();
    }
  }, []);

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={ArrowLeft}
          onPress={() => router.replace("/")}
          theme="blue_Button"
        />
        <H3>Game lobby</H3>
      </XStack>
      <H6>Create a game room, or join an existing one.</H6>
      <AvailableRooms rooms={allRooms} />
      <Footer>
        <CreateRoom />
      </Footer>
    </MyStack>
  );
}
