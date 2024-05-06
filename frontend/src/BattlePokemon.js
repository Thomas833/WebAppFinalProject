import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3001';

async function LoadBattlePokemon() {
	const response = await fetch(`http://localhost:3001/battlePokemon`);

	return await response.json();
}


export default function BattlePokemon() {

	const navigate = useNavigate();
	const initialFormData = {
		battleName: '',
		winner: '',
		playerId: null,
		opponentId: null,

	};

	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);
	const [battleOutcome, setBattleOutcome] = useState({id: null, result: ''});
	const [allPokemon, setAllPokemon] = useState([]);

	useEffect(() => {
		Promise.all([
		  fetch(`http://localhost:3001/showPokemonList`),
		])
		.then(([resUsers]) =>
        Promise.all([resUsers.json()])
      )
      	.then(([dataUsers]) => {
			setAllPokemon(dataUsers);
      });
	  }, []);



	const pokemon = useLoaderData();
	const handleChange = (event) => {
		const name = event.target.name;
		switch (name) {
			case 'battleName':
				setFormData({
					...formData,
					battleName: event.target.value,
					playerId: event.target[1].id,
					opponentId: pokemon._id,
				});
				break;	
			default:
				return;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const winOutcome = (Math.round(Math.random()));
		const firstPokemon = formData.battleName.split(" ")[0];
		const battlers = [firstPokemon, pokemon.name];

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


	return (
			<article>
				<h1>Your opponent:</h1>
                <h1>{pokemon.name}</h1>
                <p>type: {pokemon.type}</p>
                <p>wins: {pokemon.wins}</p>
				<p>----------------------------</p>
				<form onSubmit={handleSubmit}>
				<label>Choose a Pokemon to Battle</label><br />
				<select type="type" name="battleName" id="type" onChange={handleChange}>

					<option disabled hidden selected >Choose an option</option>

				{allPokemon.map((poke) => (
					<option id={`${poke._id}`} value={`${poke.name} vs ${pokemon.name}`} name={`${poke.name}`}>{`${poke.name}`}</option>
				))}
				</select>

				<button type="submit">Battle</button>
			</form>
			<Outlet />
            </article>
	);
}

export { LoadBattlePokemon };