import {styled} from "@tamagui/core";
import {ThemeableStack} from "tamagui";

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

export default Card;
