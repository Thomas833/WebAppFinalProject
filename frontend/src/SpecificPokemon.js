import { useLoaderData } from "react-router-dom";

async function LoadSpecificPokemon(request) {
    const pokemonId = request.params.pokemonId;
	const response = await fetch(`http://localhost:3001/showPokemonList/${pokemonId}`);
	return await response.json();
}

export default function SpecificPokemon() {
	const pokemon = useLoaderData();
	//console.log(todo);

	return (
			<article>
                <h1>{pokemon.name}</h1>
                <p>type: {pokemon.type}</p>
                <p>wins: {pokemon.wins}</p>
            </article>
	);
}

export { LoadSpecificPokemon };