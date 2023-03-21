import {create} from 'zustand'
import * as Colyseus from "colyseus.js";
import {Player} from "colyseus-schema";

interface State {
  room: Colyseus.Room<any> | null;
  player: Player | null;
  setPlayer: (player: Player) => void;
  players: Player[];
  setRoom: (room: Colyseus.Room<any>) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
}

const useStore = create<State>((set) => ({
  room: null,
  players: [],
  player: null,
  setPlayer: (player: Player) => set(() => ({player})),
  setRoom: (room) => set(() => ({room})),
  setPlayers: (players) => set(() => ({players})),
  addPlayer: (player) => set((state) => ({players: [...state.players, player]})),
  removePlayer: (player) => set((state) => ({players: state.players.filter(p => p.sessionId !== player.sessionId)})),
}))

export default useStore
