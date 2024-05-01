import { Outlet, Link } from "react-router-dom";

function Home() {
    return (
      <>
        <header>
          <Link to={`/createPokemon`}><h3>Create a Pokemon</h3></Link>
          <Link to={`/showPokemonList`}><h3>All Your Pokemon</h3></Link>
          <Link to={`/battlePokemon`}><h3>Battle the Pokemon</h3></Link>
        </header>
        <Outlet />
        <footer>
        </footer>
      </>
    );
  }
  
  export default Home;