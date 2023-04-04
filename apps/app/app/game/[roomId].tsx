import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { Button, H2, Text, H6, Spinner, ThemeableStack, XStack, Stack } from "tamagui";
import { useStore } from "@game/client-state";
import { useGame } from "@game/use-game-hook";
import { MyStack } from "../../components/MyStack";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";
import GameRoom from "../../components/game/GameRoom";
import { styled } from "@tamagui/core";
import { Dimensions } from "react-native";
import { Player } from "@game/colyseus-schema";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

const QuestionCard = styled(ThemeableStack, {
  name: "QuestionCard",
  backgroundColor: "$blue4",
  borderRadius: 10,
  paddingHorizontal: 25,
  paddingVertical: 25
});

const MyCard = styled(ThemeableStack, {
  hoverTheme: true,
  pressTheme: true,
  focusTheme: true,
  bordered: true
});

export default function Game() {
  const { width } = Dimensions.get("screen");
  const router = useRouter();
  // @ts-ignore
  const { roomId, username }: { roomId: string, username: string } = useSearchParams();
  const { player, players, gameState, setRoom } = useStore((state) => state);
  const { room } = useGame(router.push);

  useEffect(() => {
    if (roomId && !room) {
      client.joinById(roomId, { username })
        // @ts-ignore
        .then(room => setRoom(room))
        .catch((e) => {
          console.log(e);
          router.replace(username ? `/lobby?username=${username}` : "/");
        });
    }
  }, [room, roomId]);

  if (!room || !player) {
    return (
      <MyStack justifyContent="center">
        <Spinner size="large" color="$green10" />
      </MyStack>
    );
  }

  if (gameState?.gameStarted === false) {
    return (
      <GameRoom />
    );
  }

  const handleAnswer = (votedPlayer: Player) => {
    room.send("answer", {
      votedPlayer: votedPlayer.sessionId
    });
  }

  return (
    <MyStack justifyContent="center">
      {gameState?.gameStatus === "generatingQuestions" && (
        <>
          <Spinner size="large" color="$green10" />
          <H6 pt="$5" textAlign="center">Generating questions...</H6>
        </>
      )}

      {gameState?.gameStatus === "ready" && (
        <Stack flex={1} justifyContent="space-evenly">
          <QuestionCard>
            <H2 textAlign="center">{gameState?.questions?.[0]?.question}</H2>
          </QuestionCard>

          {players
            // TODO: Disabled for development
            //  .filter((p) => p.sessionId !== player.sessionId)
            .map((p) => (
            <XStack
              key={p.sessionId}
              rowGap={10}
              columnGap={10}
              flexWrap="wrap"
              justifyContent="center"
            >
              <Button w={width / 2 - (12 * 2)} h={100} backgroundColor="$blue11" onPress={() => handleAnswer(p)}>
                <Text color="white" textAlign="center" fontSize={16}>{p.username}</Text>
              </Button>
            </XStack>
          ))}
        </Stack>
      )}
    </MyStack>
  );
}
