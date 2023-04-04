import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { Button, H1, H2, H4, H5, H6, Spinner, ThemeableStack, XStack } from "tamagui";
import { useStore } from "@game/client-state";
import { useGame } from "@game/use-game-hook";
import { MyStack } from "../../components/MyStack";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";
import GameRoom from "../../components/game/GameRoom";
import { styled } from "@tamagui/core";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

const QuestionCard = styled(ThemeableStack, {
  name: "QuestionCard",
  backgroundColor: "$blue4",
  borderRadius: 10,
  paddingHorizontal: 25,
  paddingVertical: 25
});

export default function Game() {
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

  return (
    <MyStack justifyContent="center">
      {gameState?.gameStatus === "generatingQuestions" && (
        <>
          <Spinner size="large" color="$green10" />
          <H6 pt="$5" textAlign="center">Generating questions...</H6>
        </>
      )}

      {gameState?.gameStatus === "ready" && (
        <>
          <QuestionCard>
            <H2 textAlign="center">{gameState?.questions?.[0]?.question}</H2>
          </QuestionCard>

          {players.filter((p) => p.sessionId !== player.sessionId).map((p) => (
            <XStack
              key={p.sessionId}
              mt="$5"
              flex={1}
              flexWrap="wrap"
              justifyContent="space-around"
            >
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$orange11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$yellow11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$green11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$blue11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$purple11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$pink11" color="white">{p.username}</Button>
              <Button mb="$5" size="$7" fontSize="$7" backgroundColor="$red11" color="white">{p.username}</Button>
            </XStack>
          ))}
        </>
      )}
    </MyStack>
  );
}
