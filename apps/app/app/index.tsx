import React, { useEffect, useState } from "react";
import { useStore } from "@game/client-state";
import { styled } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import {
  ScrollView,
  ThemeableStack,
  Text,
  H2,
  Dialog,
  Button,
  Input,
  Fieldset,
  Label,
  Adapt,
  Sheet,
} from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";

const Header = styled(ThemeableStack, {
  name: "Header",
  // backgroundColor: "#9b59b6",
  alignItems: "center",
  justifyContent: "center",
  height: 120,
});

const Footer = styled(ThemeableStack, {
  name: "Footer",
  // backgroundColor: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
  height: 60,
});

const AvailableGamesTitle = styled(H2, {
  name: "AvailableGamesTitle",
  color: "#ffffff",
  fontSize: 32,
  fontWeight: "bold",
  marginTop: 25,
});

const Card = styled(ThemeableStack, {
  name: "Card",
  backgroundColor: "#ffffff",
  borderRadius: 10,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginBottom: 10,
  borderColor: "#8e44ad",
  borderWidth: 2,
});

const CardTitle = styled(Text, {
  name: "CardTitle",
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 8,
  color: "#8e44ad",
});

const GameRoomCard = ({ title, currentPlayers, maxPlayers }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <Text>
        Players: {currentPlayers}/{maxPlayers}
      </Text>
    </Card>
  );
};

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

export default function Home() {
  const { setRoom } = useStore((state) => state);
  const [allRooms, setAllRooms] = useState<Colyseus.RoomAvailable[]>([]);
  const [gameRoomName, setGameRoomName] = useState(
    `room-${Math.floor(Math.random() * 999)}`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    client
      .getAvailableRooms("game_room")
      .then((rooms) => {
        setAllRooms(rooms);
      })
      .catch((err) => {
        console.log("Error getting rooms", err);
      });

    const timer = setInterval(() => {
      client
        .getAvailableRooms("game_room")
        .then((rooms) => {
          setAllRooms(rooms);
        })
        .catch((err) => {
          console.log("Error getting rooms", err);
        });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

  return (
    <YStack flex={1}>
      <LinearGradient
        colors={["#9b59b6", "#8e44ad", "#6a1b9a"]}
        style={{ flex: 1 }}
      >
        <YStack flex={1}>
          <Header>
            <AvailableGamesTitle>Available Games</AvailableGamesTitle>
          </Header>
          <ScrollView
            flexGrow={1}
            contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          >
            {allRooms?.map((room) => (
              <GameRoomCard
                key={room.roomId}
                title={room.metadata.gameRoomName}
                currentPlayers={room.clients}
                maxPlayers={room.maxClients}
              />
            ))}
            <GameRoomCard
              title="Fake test room"
              currentPlayers={3}
              maxPlayers={8}
            />
          </ScrollView>
          <Footer>
            <Button theme="green" w="$16" onPress={() => setIsModalOpen(true)}>
              Create Game Room
            </Button>
          </Footer>
        </YStack>
      </LinearGradient>

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        key="createGameRoomDialog"
        modal
      >
        <Adapt when="sm" platform="touch">
          <Sheet zIndex={200000} dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" space>
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            o={0.5}
            enterStyle={{ o: 0 }}
            exitStyle={{ o: 0 }}
          />

          <Dialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            space
          >
            <Dialog.Title>Create Game Room</Dialog.Title>
            <Dialog.Description>
              Enter a name for your game room and click "Create room" to start
              playing.
            </Dialog.Description>
            <Fieldset>
              <Label w={160} justifyContent="center">
                Room name
              </Label>
              <Input
                size="$4"
                defaultValue={gameRoomName}
                onChangeText={(value) => setGameRoomName(value)}
              />
            </Fieldset>
            <YStack ai="center" mt="$2">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  theme="green"
                  w="$16"
                  onPress={() => createGameRoom(gameRoomName)}
                >
                  Create room
                </Button>
              </Dialog.Close>
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
}
