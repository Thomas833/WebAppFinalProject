import { Outlet, Link } from "react-router-dom";

function Home() {
    return (
      <>
        <header>
          <Link to={`/createPokemon`}><h3>Create a Pokemon</h3></Link>
        </header>
        <Outlet />
        <footer>
        </footer>
      </>
    );
  }
  
  export default Home;