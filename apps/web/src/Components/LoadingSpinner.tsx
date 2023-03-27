import {Spinner, Text} from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = ({message}: {message: string}) => (
  <>
    <Spinner
      thickness='4px'
      speed='0.65s'
      color='white'
      size='xl'
    />
    <Text fontSize="2xl" color="white">{message}</Text>
  </>
)

export default LoadingSpinner;
