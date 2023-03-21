import React from "react";
import Swiper from "react-native-deck-swiper";
import {H1, H2, Stack, XStack, YStack} from "tamagui";
import questions from "../data/questions";

export default function Home() {
  return (
    <Stack flex={1} backgroundColor="$background">
      <Swiper
        verticalSwipe={false}
        horizontalSwipe={true}
        cards={questions}
        renderCard={(card) => {
          return (
            <XStack
              flex={1}
              backgroundColor="#fff"
              justifyContent="center"
              borderRadius={30}
            >
              <YStack als="center">
                <H1>{card.category}</H1>
                <H2>{card.rule}</H2>
              </YStack>
            </XStack>
          )
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex)
        }}
        onSwipedAll={() => {
          console.log('onSwipedAll')
        }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}>
      </Swiper>
    </Stack>
  )
};
