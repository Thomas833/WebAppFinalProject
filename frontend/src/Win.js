import { useLoaderData } from "react-router-dom";

async function LoadWin(request) {
	const response = await fetch(`http://localhost:3001/battlePokemon/${request.params.battleId}/win`);
	return await response.json();
}

export default function Win() {
	const pokemon = useLoaderData();

	return (
			<article>
                <h1>{pokemon.name}</h1>
                <p>type: {pokemon.type}</p>
                <p>wins: {pokemon.wins}</p>
            </article>
	);
}

export { LoadWin };