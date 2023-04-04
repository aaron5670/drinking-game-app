import { useEffect, useState } from "react";
import { PersonStanding } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('@username')
        if(value !== null) {
          setUsername(value);
          router.push(`/lobby?username=${value}`);
        }
      } catch(e) {
        console.log(e);
      }
    }
    getUsername();
  }, []);

  const storeUsername = async (value) => {
    try {
      await AsyncStorage.setItem('@username', value)
      router.push(`/lobby?username=${username}`);
    } catch (e) {
      console.log(e);
    }
  }

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
          <Button
            theme="green_Button"
            disabled={username.length === 0}
            onPress={() => storeUsername(username)}
          >
            Let's play
          </Button>
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
