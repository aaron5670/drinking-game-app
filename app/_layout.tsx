import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <Slot/>
      </Theme>
    </TamaguiProvider>
  );
}
