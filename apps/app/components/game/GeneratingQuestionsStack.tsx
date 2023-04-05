import React from "react";
import { H6, Spinner } from "tamagui";
import { MyStack } from "../MyStack";

const GeneratingQuestionsStack = () => (
  <MyStack justifyContent="center">
    <Spinner size="large" color="$green10" />
    <H6 pt="$5" textAlign="center">Generating questions...</H6>
  </MyStack>
);

export default GeneratingQuestionsStack;
