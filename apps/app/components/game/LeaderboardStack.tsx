import React from "react";
import { useRouter, useSearchParams } from "expo-router";
import { useStore } from "@game/client-state";
import { useGame } from "@game/use-game-hook";
import { Button, H3, ListItem, Separator, ScrollView, Text, XStack, YGroup } from "tamagui";
import { Beer, ChevronLeft, Crown, X } from "@tamagui/lucide-icons";
import Footer from "../lobby/Footer";
import { MyStack } from "../MyStack";

const LeaderboardStack = () => {
  const router = useRouter();
  const { room } = useGame(router.push);
  const { resetGame } = useStore((state) => state);
  // @ts-ignore
  const { username }: { username: string } = useSearchParams();

  const handleLeaveRoom = () => {
    room.leave()
      .then(() => resetGame())
      .catch((e) => {
        console.log(e);
        resetGame();
      })
      .finally(() => router.replace(`/lobby?username=${username}`));
  };

  const score = [
    { username: "Aaron", score: 5 },
    { username: "John", score: 3 },
    { username: "Stefan", score: 3 },
    { username: "Jane", score: 6 },
    { username: "Kevin", score: 7 },
    { username: "Jan", score: 2 },
    { username: "Kees", score: 2 }
  ].sort((a, b) => b.score - a.score);

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={X}
          onPress={handleLeaveRoom}
          theme="red_Button"
        />
        <H3>Game over</H3>
      </XStack>
      <Text
        color="$white"
        fontFamily="$body"
        fontSize="$5"
      >
        Het spel is afgelopen. De winnaar is
        <Text fontWeight="900">
          {" "}Kevin{" "}
        </Text>
        met 7 slokken.
      </Text>
      <ScrollView
        flexGrow={1}
        contentContainerStyle={styles.availableRoomsContainer}
      >
        {score.map((item, index) => (
          // TODO: Change index to sessionId
          <YGroup key={index} separator={<Separator />} theme={index % 2 === 1 ? "gray_Button" : null}>
            <YGroup.Item>
              <ListItem
                icon={index === 0 ? Crown : Beer}
                scaleIcon={1.4}
                title={item.username}
                subTitle={`Neemt ${item.score} slokken`}
              />
            </YGroup.Item>
          </YGroup>
        ))}
      </ScrollView>
      <Footer>
        <Button icon={ChevronLeft} w="100%" size="$5" theme="blue_Button" onPress={handleLeaveRoom}>
          Ga naar de lobby
        </Button>
      </Footer>
    </MyStack>
  );
};

const styles = {
  availableRoomsContainer: {
    flexGrow: 1
  }
};


export default LeaderboardStack;
