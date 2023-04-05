import React, { useState } from "react";
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Spinner } from "tamagui";
import { YStack } from "@tamagui/stacks";
import { useRouter, useSearchParams } from "expo-router";
import useCreateGameRoom from "../../hooks/useCreateRoom";
import Constants from "expo-constants";
import * as Colyseus from "colyseus.js/dist/colyseus";
import { useGame } from "@game/use-game-hook";
import { useStore } from "@game/client-state";

const colyseusApiUrl = Constants.expoConfig.extra.colyseusApiUrl;
const client = new Colyseus.Client(colyseusApiUrl);

const CreateRoom = () => {
  const router = useRouter();
  const params = useSearchParams();
  const createGameRoom = useCreateGameRoom(client);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setRoom } = useStore((state) => state);
  const { room } = useGame(router.push);
  const [category, setCategory] = useState("");
  const [gameRoomName, setGameRoomName] = useState(
    `${params.username}'s room` || "Game room"
  );

  const handleCreateRoom = () => {
    setLoading(true);
    createGameRoom(gameRoomName, category)
      .then((room) => {
        setRoom(room);
        setLoading(false);
        setIsOpen(false);
        router.push(`/game/${room.id}?username=${params.username}`);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <Button theme="green" onPress={() => setIsOpen(true)} w="$20">Create Game Room</Button>

      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          zIndex={200000}
          snapPoints={[55]}
          modal
          dismissOnSnapToBottom
        >
          <Sheet.Frame
            padding="$4"
            space
          >
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
                overshootClamping: true
              }
            }
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
              defaultValue={gameRoomName as string}
              onChangeText={(value) => setGameRoomName(value)}
            />
          </Fieldset>
          <Fieldset>
            <Label w={160} justifyContent="center">
              Category
            </Label>
            <Input
              size="$4"
              onChangeText={(value) => setCategory(value)}
            />
          </Fieldset>
          <YStack ai="center" mt="$2">
            <Button
              theme="green"
              w="$16"
              icon={loading ? <Spinner /> : null}
              disabled={room !== null}
              onPress={handleCreateRoom}
            >
              Create room
            </Button>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default CreateRoom;
