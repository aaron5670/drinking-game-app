import {styled} from "@tamagui/core";
import {ThemeableStack} from "tamagui";

const Card = styled(ThemeableStack, {
  name: "Card",
  backgroundColor: "$blue4",
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  marginBottom: 10,
});

export default Card;
