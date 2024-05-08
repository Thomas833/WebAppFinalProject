import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3001';

async function LoadBattlePokemon() {
  const response = await fetch(`${BASE_URL}/battlePokemon`);
  return await response.json();
}

export default function BattlePokemon() {
  const navigate = useNavigate();
  const initialFormData = {
    battleName: '',
    winner: '',
    playerId: null,
    opponentId: null,
    image: '',
  };

  const initialResultMessage = {
    msg: '',
    newId: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(initialResultMessage);
  const [battleOutcome, setBattleOutcome] = useState({id: null, result: ''});
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/showPokemonList`)
      .then(response => response.json())
      .then(data => setAllPokemon(data));
  }, []);

  const pokemon = useLoaderData();
  const ourPokemonImage = '';

  const handleChange = (event) => {
    const name = event.target.name;
    switch (name) {
      case 'battleName':
        setFormData({
          ...formData,
          battleName: event.target.value,
          playerId: event.target[1].id,
          opponentId: pokemon._id,
          image: event.target.name,
        });

        break;
      default:
        return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const winOutcome = Math.round(Math.random());
    const firstPokemon = formData.battleName.split(" ")[0];
    const battlers = [firstPokemon, pokemon.name];

    if (winOutcome == 1){
      setFormData({
        ...formData,
        image: pokemon.image,
      });
    }
    else{
      setFormData({
        ...formData,
        image: pokemon.image,
      });
    }
    fetch(`${BASE_URL}/battlePokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        winner: battlers[winOutcome],
      }),
    })
    .then((result) => result.json())
    .then((battleId) => {
      let outcome;
      if (winOutcome === 1){
        outcome = "lose";
      } else {
        outcome = "win";
      }

      navigate(`${battleId}/${outcome}`, {replace: true});
    });
  }

  const pageStyle = {
    body: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    },
    article: {
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: "#333",
      borderRadius: "5px"
    },
    h1: {
      fontSize: "24px",
      marginBottom: "10px"
    },
    p: {
      marginBottom: "5px"
    },
    form: {
      marginTop: "20px"
    },
    label: {
      marginBottom: "5px"
    },
    select: {
      marginBottom: "10px",
      padding: "5px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "5px",
      border: "1px solid #333",
      backgroundColor: "#444",
      color: "#fff"
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer"
    }
  };

  return (
    <div style={pageStyle.body}>
      <article style={pageStyle.article}>
        <h1 style={pageStyle.h1}>Your opponent:</h1>
        <h1 style={pageStyle.h1}>{pokemon.name}</h1>
        <p style={pageStyle.p}>Type: {pokemon.type}</p>
        <p style={pageStyle.p}>Wins: {pokemon.wins}</p>
        <p style={pageStyle.p}>----------------------------</p>
        <form style={pageStyle.form} onSubmit={handleSubmit}>
          <label style={pageStyle.label}>Choose a Pokemon to Battle</label><br />
          <select style={pageStyle.select} type="type" name="battleName" id="type" onChange={handleChange}>
            <option disabled hidden selected>Choose an option</option>
            {allPokemon.map((poke) => (
              <option key={poke._id} id={poke._id} value={`${poke.name} vs ${pokemon.name}`} name={poke.image}>{poke.name}</option>
            ))}
          </select>
          <button style={pageStyle.button} type="submit">Battle</button>
        </form>
      </article>
    </div>
  );
}

export { LoadBattlePokemon };
