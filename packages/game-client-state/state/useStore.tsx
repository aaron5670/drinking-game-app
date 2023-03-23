import {create} from "zustand";
import * as Colyseus from "colyseus.js";
import {Player} from "@game/colyseus-schema";

interface State {
  room: Colyseus.Room<any> | null;
  player: Player | null;
  players: Player[];
  gameStarted: boolean;
  startGame: () => void;
  setRoom: (room: Colyseus.Room<any>) => void;
  setPlayer: (player: Player | null) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
}

export const useStore = create<State>((set) => ({
  room: null,
  players: [],
  player: null,
  gameStarted: false,
  setPlayer: (player) => set(() => ({player})),
  setRoom: (room) => set(() => ({room})),
  setPlayers: (players) => set(() => ({players})),
  addPlayer: (player) => set((state) => ({players: [...state.players, player]})),
  removePlayer: (player) => set((state) => ({players: state.players.filter(p => p.sessionId !== player.sessionId)})),
  startGame: () => set(() => ({gameStarted: true})),
}))
