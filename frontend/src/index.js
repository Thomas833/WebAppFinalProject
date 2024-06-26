import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import CreatePokemon, {LoadImages} from './CreatePokemon';
import PokemonList, {LoadPokemon} from './ListPokemon';
import SpecificPokemon, { LoadSpecificPokemon } from './SpecificPokemon';
import BattlePokemon, { LoadBattlePokemon } from './BattlePokemon';
import  Win, { LoadWin } from './Win';
import  Lose, { LoadLose } from './Lose';
import Home from './Home';



const router = createBrowserRouter([
  {
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/createPokemon",
        element: <CreatePokemon/>,
        loader: LoadImages,
      },
      {
        path:"/showPokemonList",
        element: <PokemonList/>,
        loader: LoadPokemon,
      },
      {
        path:"/showPokemonList/:pokemonId",
        element: <SpecificPokemon/>,
        loader: LoadSpecificPokemon,
      },
      {
        path:"/battlePokemon",
        element: <BattlePokemon />,
        loader: LoadBattlePokemon,
      },
      {
        path:"/battlePokemon/:battleId/lose",
        elememt: <Lose />,
        loader: LoadLose,
      },
      {
        path: "/battlePokemon/:battleId/win",
        element: <Win />,
        loader: LoadWin,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
