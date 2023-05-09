import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./pages/Protected";
import Profile from "./pages/Profile";
import Plays from "./pages/Plays";
import Events from "./pages/Events";
import GamePage from "./pages/GamePage";
import Games from "./pages/Games";
import getGameData from "./utility/getGameData";
import '@smastrom/react-rating/style.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Protected />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "plays", element: <Plays /> }
        ],
      },
      { path: "events", element: <Events/> },
      { path: "games", element: <Games/> },
      { path: "boardgame/:id/:name", element: <GamePage />, loader: ({params})=>getGameData(params.id)},
      { path: "googleauth", element: <AuthPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
