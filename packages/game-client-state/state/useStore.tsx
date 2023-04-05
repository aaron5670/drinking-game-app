import {create} from "zustand";
import produce from "immer";
import * as Colyseus from "colyseus.js";
import {GameState, Player} from "@game/colyseus-schema";

interface State {
  room: Colyseus.Room<any> | null;
  player: Player | null;
  players: Player[];
  gameState: GameState | null;
  setRoom: (room: Colyseus.Room<any>) => void;
  setPlayer: (player: Player | null) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  setGameState: (field: string, value: any) => void;
  resetGame: () => void;
}

export const useStore = create<State>((set) => ({
  room: null,
  players: [],
  player: null,
  gameState: null,
  setPlayer: (player) => set(() => ({player})),
  setRoom: (room) => set(() => ({room})),
  setPlayers: (players) => set(() => ({players})),
  addPlayer: (player) => set((state) => ({players: [...state.players, player]})),
  removePlayer: (player) => set((state) => ({players: state.players.filter(p => p.sessionId !== player.sessionId)})),
  setGameState: (field, value) => set(produce((draft: State) => {
    // @ts-ignore -> I don't know how to fix this
    draft.gameState = {
      ...draft.gameState,
      [field]: value
    };
  })),
  resetGame: () => set(() => ({
    room: null,
    players: [],
    player: null,
    gameState: null
  }))
}))
