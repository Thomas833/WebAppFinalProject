import { useLoaderData, Link } from "react-router-dom";

async function LoadPokemon() {
	const response = await fetch(`http://localhost:3001/showPokemonList`);
	return await response.json();
}

export default function PokemonList() {
	const list = useLoaderData();
	
	return (
		<>
			<h2>List of Pokemon:</h2>
			{list.map((pokemon) => (
				<article>
					<Link to={`/showPokemonList/${pokemon._id}`}><h1>{pokemon.name}</h1></Link>
				</article>
			))}
		</>
	);
}

export { LoadPokemon };