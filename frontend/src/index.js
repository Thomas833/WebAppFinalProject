import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import CreatePokemon from './CreatePokemon';
import PokemonList, {LoadPokemon} from './ListPokemon';
import SpecificPokemon, { LoadSpecificPokemon } from './SpecificPokemon';
import BattlePokemon, { LoadBattle } from './BattlePokemon';
import  Win, { LoadWin } from './Win';
import  Lose, { LoadLose } from './Lose';



const router = createBrowserRouter([
  {
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      {
        path:"/createPokemon",
        element: <CreatePokemon/>,
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
        loader: LoadBattle,
        children:[
          {
            path:":battleId/lose",
            elememt: <Lose />,
            loader: LoadLose,
          },
          {
            path: ":battleId/win",
            element: <Win />,
            loader: LoadWin,
          }
        ]
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
