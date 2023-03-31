import { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { ArrowLeft, User, Star } from "@tamagui/lucide-icons";
import { Button, H3, H6, ListItem, XStack, YGroup } from "tamagui";
import { useStore } from "@game/client-state";
import { useGame } from "@game/use-game-hook";
import { MyStack } from "../../components/MyStack";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

export default function Game() {
  const router = useRouter();
  // @ts-ignore
  const {roomId, username}: {roomId: string, username: string} = useSearchParams();
  const {players, setRoom, setPlayer, setPlayers} = useStore((state) => state);
  const {room, player} = useGame(router.push);

  useEffect(() => {
    if (roomId && !room) {
      client.joinById(roomId, {username})
        // @ts-ignore
        .then(room => setRoom(room))
        .catch((e) => {
          console.log(e)
          router.replace(username ? `/lobby?username=${username}` : '/');
        });
    }
  }, [room, roomId])

  if (!room || !player) {
    return null;
  }

  const leaveRoom = () => {
    setPlayers([]);
    setPlayer(null);
    setRoom(null);
    room.leave();
    router.back();
  }

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
    </MyStack>
  );
}
