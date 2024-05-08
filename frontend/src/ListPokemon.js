import { useLoaderData, Link } from "react-router-dom";

async function LoadPokemon() {
  const response = await fetch(`http://localhost:3001/showPokemonList`);
  return await response.json();
}

export default function PokemonList() {
  const list = useLoaderData();

  const pageStyle = {
    body: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    },
    h2: {
      fontSize: "24px",
      marginBottom: "20px"
    },
    article: {
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#333",
      borderRadius: "5px"
    },
    link: {
      textDecoration: "none",
      color: "#fff"
    },
    h1: {
      fontSize: "20px",
      marginBottom: "10px"
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "5px",
      marginBottom: "10px"
    },
    p: {
      marginBottom: "5px"
    }
  };

  return (
    <div style={pageStyle.body}>
      <h2 style={pageStyle.h2}>List of Pokemon:</h2>
      {list.map((pokemon) => (
        <article style={pageStyle.article} key={pokemon._id}>
          <Link to={`/showPokemonList/${pokemon._id}`} style={pageStyle.link}><h1 style={pageStyle.h1}>{pokemon.name}</h1></Link>
          <img src={`/images/${pokemon.image}`} style={pageStyle.img} alt={pokemon.name} />
          <p style={pageStyle.p}>Type: {pokemon.type}</p>
          <p style={pageStyle.p}>Wins: {pokemon.wins}</p>
        </article>
      ))}
    </div>
  );
}

export { LoadPokemon };