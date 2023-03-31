import {useRouter} from "expo-router";
import {useStore} from "@game/client-state";

const useCreateGameRoom = (client) => {
  const { setRoom } = useStore((state) => state);
  const router = useRouter();

  return (gameRoomName: string) => {
    client
      .create("game_room", {
        gameRoomName,
        username: `user-${Math.floor(Math.random() * 999)}`,
      })
      .then((room) => {
        // @ts-ignore
        setRoom(room);
        router.push(`/game/${room.id}?gameRoomName=${gameRoomName}`);
      });
  };
}

export default useCreateGameRoom;
