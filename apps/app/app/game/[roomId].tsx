import {usePathname, useSearchParams} from "expo-router";
import React from 'react';
import { Text, YStack, styled, useTheme } from 'tamagui';

const GameRoomTitle = styled(Text, {
  fontSize: '$4xl',
  color: '$primary',
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '$lg',
});

const PlayerList = styled(YStack, {
  backgroundColor: '$accent',
  borderRadius: '$md',
  padding: '$md',
});

const Player = styled(YStack, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$sm',
  borderRadius: '$sm',
  backgroundColor: '$primary',
  marginBottom: '$sm',
});

const PlayerName = styled(Text, {
  fontSize: '$lg',
  color: '$white',
});

const PlayerRole = styled(Text, {
  fontSize: '$md',
  color: '$white',
});

const LobbyButton = styled(YStack, {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$lg',
  padding: '$md',
  backgroundColor: '$primary',
  marginTop: '$lg',
});

const ButtonText = styled(Text, {
  fontSize: '$lg',
  color: '$white',
});

export default function Game() {
  const {roomId} = useSearchParams();
  const theme = useTheme();

  return (
    <YStack space="$lg" padding="$lg" backgroundColor={theme.backgroundColor}>
      <GameRoomTitle>Game room</GameRoomTitle>
      <PlayerList>
        <Player>
          <PlayerName>Aaron</PlayerName>
          <PlayerRole>Host</PlayerRole>
        </Player>
        <Player>
          <PlayerName>Joost</PlayerName>
          <PlayerRole>Host</PlayerRole>
        </Player>
        <Player>
          <PlayerName>Rick</PlayerName>
          <PlayerRole>Host</PlayerRole>
        </Player>
        {/*{players.map((player) => (*/}
        {/*  <Player key={player.username}>*/}
        {/*    <PlayerName>{player.username}</PlayerName>*/}
        {/*    <PlayerRole>{player.host ? 'Host' : 'Player'}</PlayerRole>*/}
        {/*  </Player>*/}
        {/*))}*/}
      </PlayerList>
      <LobbyButton onPress={() => console.log("exit")}>
        <ButtonText>Exit Game Room</ButtonText>
      </LobbyButton>
      <LobbyButton onPress={() => console.log("Start")}>
        <ButtonText>Start Game</ButtonText>
      </LobbyButton>
    </YStack>
  );
}
