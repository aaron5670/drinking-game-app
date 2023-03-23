# @game/colyseus-schema

This package contains the schema definitions for the game state.
This is used by the server to validate the state and by the client to validate the state and to generate the typescript
interfaces.

## Usage

```tsx
import {Player} from '@game/colyseus-schema';

// Use it as Class
new Player('aaron', '1234', true);

// Use it as a type
const player: Player = {
  username: 'aaron',
  sessionId: '1234',
  isHost: true,
};
```
