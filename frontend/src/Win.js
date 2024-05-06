import { useLoaderData } from "react-router-dom";

async function LoadWin(request) {
	const response = await fetch(`http://localhost:3001/battlePokemon/${request.params.battleId}`);
	return await response.json();
}

export default function Win() {
	const battle = useLoaderData();

	return (
			<article>
                <h1>{battle.battleName}</h1>
                <p>winner: {battle.winner}</p>
            </article>
	);
}

export { LoadWin };