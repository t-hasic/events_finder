import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Feature Search
            </Link>
            <Link className="nav-link" to="/chat-search">
              Chat Search
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
