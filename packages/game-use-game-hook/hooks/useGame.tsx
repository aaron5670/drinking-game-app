import {useEffect} from 'react';
import {Player} from "@game/colyseus-schema";
import {useStore} from "@game/client-state";

export const useGame = (navigate: any) => {
  const {
    room,
    setRoom,
    setPlayer,
    setPlayers,
    addPlayer,
    removePlayer,
    setGameState
  } = useStore((state) => state);

  useEffect(() => {
    if (room) {
      room.onStateChange.once((state) => {
        const players = state.players.map(
          ({sessionId, username, isHost}: Player) => new Player(username, sessionId, isHost)
        );

        // find and set the current player
        const player = players.find((player: Player) => player.sessionId === room.sessionId);
        setPlayer(player);

        // set all players
        setPlayers(players);
      });

      // when a new player joins the room
      room.state.players.onAdd = ({username, sessionId, isHost}: Player) => {
        addPlayer(new Player(username, sessionId, isHost));
      };

      // TODO: Find correct type for changes
      room.state.gameState.onChange = function (changes: any[]) {
        changes.forEach((state) => {
          setGameState(state.field, state.value);
        })
      }

      // when a player leaves the room
      room.state.players.onRemove = (player: Player) => {
        removePlayer(player);

        if (player.isHost) {
          setPlayers([]);
          setPlayer(null);
          setRoom(null);

          room.leave().then(() => {
            navigate('/');
          });
        }
      }

      // when there is an error
      room.onError.once((code, message) => {
        console.log(code, message);
      });
    }
  }, [room])

  return {room};
}
