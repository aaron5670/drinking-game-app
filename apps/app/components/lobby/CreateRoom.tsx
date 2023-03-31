import React, { useState } from "react";
import { Adapt, Button, Dialog, Fieldset, Input, Label, Sheet, Unspaced } from "tamagui";
import { YStack } from "@tamagui/stacks";
import { X } from "@tamagui/lucide-icons";
import { useSearchParams } from "expo-router";

const CreateRoom = ({ onCreateRoom }) => {
  const params = useSearchParams();
  const [gameRoomName, setGameRoomName] = useState(
    params.username || "Game room"
  );

  const handleSubmit = () => {
    onCreateRoom(gameRoomName);
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button theme="green">Create Game Room</Button>
      </Dialog.Trigger>

      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          zIndex={200000}
          snapPoints={[40]}
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
          <YStack ai="center" mt="$2">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="green" w="$16" onPress={handleSubmit}>
                Create room
              </Button>
            </Dialog.Close>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                pos="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default CreateRoom;
