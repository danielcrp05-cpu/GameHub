import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav>
      <Link to="/">GameHub</Link>
      <Link to="/games">Meus jogos</Link>
      <button onClick={onLogout}>Sair</button>
    </nav>
  );
}

export default Navbar;
