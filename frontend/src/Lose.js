import { useLoaderData } from "react-router-dom";

async function LoadLose(request) {
	const response = await fetch(`http://localhost:3001/battlePokemon/${request.params.battleId}`);
	return await response.json();
}

export default function Lose() {
	const battle = useLoaderData();

	return (
			<article>
                <h1>{battle.battleName}</h1>
                <p>type: {battle.type}</p>
                <p>wins: {battle.wins}</p>
            </article>
	);
}

export { LoadLose };