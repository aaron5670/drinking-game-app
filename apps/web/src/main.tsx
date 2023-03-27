import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Lobby from './Lobby'
import Game from "./Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby/>,
  },
  {
    path: "/game/:roomId",
    element: <Game/>,
    //errorElement: <p>Something went wrong</p>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router}/>
  </ChakraProvider>
)
