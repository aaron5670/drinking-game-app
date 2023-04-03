import Footer from "../lobby/Footer";
import { Button } from "tamagui";
import React from "react";
import { useStore } from "@game/client-state";
import { useGame } from "@game/use-game-hook";
import { useRouter } from "expo-router";

const StartGameButton = () => {
  const router = useRouter();
  const { room } = useGame(router.push);
  const { players, player } = useStore((state) => state);

  if (!player.isHost) return null;

  if (players.length <= 1) {
    return (
      <Footer>
        <Button disabled>Waiting for other players</Button>
      </Footer>
    );
  }

  return (
    <Footer>
      <Button theme="green" onPress={() => room.send('startGame')}>
        Start the Game
      </Button>
    </Footer>
  );
};

export default StartGameButton;
