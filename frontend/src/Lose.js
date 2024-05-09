import { useLoaderData } from "react-router-dom";

async function LoadLose(request) {
  const response = await fetch(`http://localhost:3001/battlePokemon/${request.params.battleId}/lose`);
  return await response.json();
}

export default function Lose() {
  const battle = useLoaderData();
  console.log("BATTLE", battle.battleName.split(" ")[3]);

  const pageStyle = {
    body: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    },
    h1: {
      fontSize: "24px",
      marginBottom: "10px"
    },
    p: {
      marginBottom: "5px"
    }
  };

  return (
    <div style={pageStyle.body}>
      <article>
      <img src={require(`./images/${battle.battleName.split(" ")[3]}`)} style={pageStyle.img} alt={battle.battleName} />

        <h1 style={pageStyle.h1}>{battle.battleName.split(" ")[0] + " " + battle.battleName.split(" ")[1] +  " " + battle.battleName.split(" ")[2]}</h1>
        <p style={pageStyle.p}>Wins: {battle.wins}</p>
      </article>
    </div>
  );
}

export { LoadLose };
