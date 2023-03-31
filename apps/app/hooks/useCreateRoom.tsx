import { useRouter, useSearchParams } from "expo-router";
import {useStore} from "@game/client-state";

const useCreateGameRoom = (client) => {
  // @ts-ignore
  const { username }: { username: string} = useSearchParams();
  const { setRoom } = useStore((state) => state);
  const router = useRouter();

  return (gameRoomName: string) => {
    client
      .create("game_room", {
        gameRoomName,
        username,
      })
      .then((room) => {
        // @ts-ignore
        setRoom(room);
        router.push(`/game/${room.id}?username=${username}`);
      });
  };
}

export default useCreateGameRoom;
