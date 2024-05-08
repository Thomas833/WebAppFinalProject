import { Outlet, Link } from "react-router-dom";

function Home() {
  const pageStyle = {
    body: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    },
    header: {
      backgroundColor: "#333",
      padding: "20px"
    },
    headerH3: {
      margin: 0,
      padding: "10px"
    },
    link: {
      color: "#fff",
      textDecoration: "none"
    },
    linkHover: {
      textDecoration: "underline"
    },
    footer: {
      backgroundColor: "#333",
      padding: "20px",
      position: "fixed",
      bottom: 0,
      width: "100%"
    }
  };

  return (
    <div style={pageStyle.body}>
      <header style={pageStyle.header}>
        <Link to="/createPokemon" style={pageStyle.link}><h3 style={pageStyle.headerH3}>Create a Pokemon</h3></Link>
        <Link to="/showPokemonList" style={pageStyle.link}><h3 style={pageStyle.headerH3}>All Your Pokemon</h3></Link>
        <Link to="/battlePokemon" style={pageStyle.link}><h3 style={pageStyle.headerH3}>Battle the Pokemon</h3></Link>
      </header>
      <Outlet />
      <footer style={pageStyle.footer}>
      </footer>
    </div>
  );
}

export default Home;
