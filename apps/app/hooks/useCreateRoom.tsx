import { useSearchParams } from "expo-router";

const useCreateGameRoom = (client) => {
  // @ts-ignore
  const { username }: { username: string} = useSearchParams();

  return (gameRoomName: string, category: string) => {
    return client
      .create("game_room", {
        gameRoomName,
        username,
        category
      })
  };
}

export default useCreateGameRoom;
