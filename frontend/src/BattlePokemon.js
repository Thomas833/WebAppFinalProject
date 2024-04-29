import { useLoaderData } from "react-router-dom";

async function LoadBattle() {
	const response = await fetch(`http://localhost:3001/battlePokemon`);
	return await response.json();
}

export default function BattlePokemon() {
	const pokemon = useLoaderData();

	return (
			<article>
                <h1>{pokemon.name}</h1>
                <p>type: {pokemon.type}</p>
                <p>wins: {pokemon.wins}</p>
            </article>
	);
}

export { LoadBattle };