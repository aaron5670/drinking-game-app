import { useStore } from "@game/client-state";

const useCreateGameRoom = (client) => {
  const { setRoom } = useStore((state) => state);

  const createGameRoom = (gameRoomName: string) => {
    client
      .create("game_room", {
        gameRoomName,
        username: `user-${Math.floor(Math.random() * 999)}`,
      })
      .then((room) => {
        // @ts-ignore
        setRoom(room);
        // navigate(`/game/${room.id}`, {state: {host: true}})
      });
  };

  return createGameRoom;
}

export default useCreateGameRoom;
