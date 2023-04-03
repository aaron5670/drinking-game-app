import { MyStack } from "../MyStack";
import { Button, H3, H6, ListItem, ScrollView, XStack, YGroup } from "tamagui";
import { ArrowLeft, Star, User } from "@tamagui/lucide-icons";
import StartGameButton from "./StartGameButton";
import React from "react";
import { useRouter } from "expo-router";
import { useGame } from "@game/use-game-hook";
import { useStore } from "@game/client-state";

const GameRoom = () => {
  const router = useRouter();
  const { players, setRoom, setPlayer, setPlayers } = useStore((state) => state);
  const { room } = useGame(router.push);

  const leaveRoom = () => {
    setPlayers([]);
    setPlayer(null);
    setRoom(null);
    room.leave()
      .then(() => router.back())
      .catch((e) => {
        console.log(e);
        router.back();
      });
  };

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={ArrowLeft}
          onPress={leaveRoom}
          theme="blue_Button"
        />
        <H3>{room.state.gameRoomName}</H3>
      </XStack>
      <H6>
        Wait for other players to join, or start the game if you&apos;re the
        host.
      </H6>
      <ScrollView
        flexGrow={1}
        contentContainerStyle={styles.availableRoomsContainer}
      >
        <YGroup als="center" bordered w="100%" size="$4">
          {players.map((player) => {
            if (player.isHost) {
              return (
                <YGroup.Item key={player.sessionId}>
                  <ListItem hoverTheme icon={Star} title={player.username} subTitle="Host" />
                </YGroup.Item>
              );
            }
            return (
              <YGroup.Item key={player.sessionId}>
                <ListItem hoverTheme icon={User} title={player.username} />
              </YGroup.Item>
            );
          })}
        </YGroup>
      </ScrollView>
      <StartGameButton />
    </MyStack>
  );
};

const styles = {
  availableRoomsContainer: {
    flexGrow: 1
  }
};

export default GameRoom;
