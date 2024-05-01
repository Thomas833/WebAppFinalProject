import { Outlet } from "react-router-dom";
import './index.css';

function Root() {
    return (
      <>
        <header>
        </header>
        <Outlet />
        <footer>
        </footer>
      </>
    );
  }
  
  export default Root;