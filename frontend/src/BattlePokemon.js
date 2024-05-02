import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react"

const BASE_URL = 'http://localhost:3001';

async function LoadBattle() {
	const response = await fetch(`http://localhost:3001/battlePokemon`);

	return await response.json();
}


export default function BattlePokemon() {

	const initialFormData = {
		name: '',
		type:null,
		image: null,
		wins: 0,
	};

	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);
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

	  console.log(allPokemon);



	const pokemon = useLoaderData();
	console.log(pokemon);

	const handleChange = (event) => {
		const name = event.target.name;
		switch (name) {
			case 'name':
				setFormData({
					...formData,
					name: event.target.value,
				});
				break;
			case 'type':
				setFormData({
					...formData,
					type: event.target.value,
				});
				break;
			case 'img':
				var imagePath = event.target.value;
				var splitArr = imagePath.split("\\");
				//console.log(splitArr[splitArr.length -1]);
				setFormData({
					...formData,
					image: splitArr[splitArr.length - 1],
				});
				break;
			default:
				return;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const result = await fetch(`${BASE_URL}/createPokemon`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (result.status !== 201) {
			setMessage({ msg: "Failed to create...", newId: null });
			return;
		}
		setFormData(initialFormData);
		//console.log("reset data");
	}


	return (
			<article>
                <h1>{pokemon.name}</h1>
                <p>type: {pokemon.type}</p>
                <p>wins: {pokemon.wins}</p>

				<form onSubmit={handleSubmit}>
				<label>Choose a Pokemon to Battle</label><br />
				<select type="type" name="type" id="type" onChange={handleChange}>

					<option disabled selected hidden >Choose an option</option>


					{/* <option value="Fire">Fire</option>
					<option value="Bug">Bug</option>
					<option value="Flying">Flying</option>
					<option value="Normal">Normal</option>
					<option value="Electric">Electric</option>
					<option value="Ground">Ground</option> */}

				{allPokemon.map((poke) => (
					<option value={`${poke.name}`}>{`${poke.name}`}</option>
					// <article>
					// 	<Link to={`/showPokemonList/${pokemon._id}`}><h1>{pokemon.name}</h1></Link>
					// 	<img src={`/images/${pokemon.image}`}/>
					// 	<p>{pokemon.type}</p>
					// 	<p>{pokemon.wins}</p>
					// </article>
				))}
				</select>

				<button type="submit">Battle</button>
			</form>

            </article>


	);
}

export { LoadBattle };