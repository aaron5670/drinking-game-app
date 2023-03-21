import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Lobby from './Lobby'
import './index.css'
import Game from "./Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby/>,
  },
  {
    path: "/game",
    element: <Game/>,
    //errorElement: <p>Something went wrong</p>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router}/>
)
