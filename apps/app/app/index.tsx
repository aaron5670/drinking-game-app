import { useState } from "react";
import { PersonStanding } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import {
  Button,
  H1,
  Input,
  ListItem,
  Paragraph,
  Separator,
  YGroup,
  YStack
} from "tamagui";

import { MyStack } from "../components/MyStack";

export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <MyStack>
      <YStack
        space="$4"
        maxWidth={600}
      >
        <H1 textAlign="center" marginTop="$10">DrinkBuddies Game.</H1>
        <Paragraph textAlign="center">
          Drink, Laugh, Compete, and Repeat!
        </Paragraph>
      </YStack>

      <YStack space="$2">
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
        />
        <Link
          asChild
          replace={false}
          href={`/lobby?username=${username}`}
        >
          <Button
            theme="green_Button"
            disabled={username.length === 0}
          >
            Let's play
          </Button>
        </Link>
      </YStack>

      <YStack space="$5">
        <YGroup
          bordered
          separator={<Separator />}
          theme="green"
        >
          <YGroup.Item>
            <Link
              asChild
              href="https://www.aaronvandenberg.nl"
            >
              <ListItem
                hoverTheme
                title="Aaron van den Berg"
                icon={PersonStanding}
                pressTheme
              />
            </Link>
          </YGroup.Item>
        </YGroup>
      </YStack>
    </MyStack>
  );
}
