# @game/use-game-hook
This package contains the hook that is used to connect to the game server and to subscribe to the game state.
This is used by the client to get the game state and to send commands to the server.

## Usage
```tsx
import { useGame } from '@game/use-game-hook';

const [room, player, players, gameStarted] = useGame(navigate);
```
