# @game/client-state

This package contains the game state that is used by the client.
This is used by the client to render the game state.

## Usage

```tsx
import {useStore} from '@game/client-state';

const {
  room, player, players, setPlayers, setRoom, setPlayer
} = useStore((state) => state);
```
