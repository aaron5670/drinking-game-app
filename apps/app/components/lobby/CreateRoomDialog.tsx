import React, {useState} from "react";
import {Adapt, Button, Dialog, Fieldset, Input, Label, Sheet} from "tamagui";
import {YStack} from "@tamagui/stacks";

const CreateRoomDialog = ({ isOpen, onClose, onCreateRoom }) => {
  const [gameRoomName, setGameRoomName] = useState(
    `room-${Math.floor(Math.random() * 999)}`
  );

  const handleSubmit = () => {
    onCreateRoom(gameRoomName);
    onClose(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      key="createGameRoomDialog"
      modal
    >
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} snapPoints={[40]} dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
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
                <Button theme="green" w="$16" onPress={handleSubmit}>
                  Create room
                </Button>
              </Dialog.Close>
            </YStack>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
    </Dialog>
  );
};

export default CreateRoomDialog;
