import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const goClientZone = () => navigate("/");
    return (
        <nav>
            <div className="Logo">
                <img
                    src="https://fontmeme.com/permalink/220707/6783a1cce80ee9da42ed943363c24434.png"
                    alt="logo"
                    to="/"
                />
            </div>
            <div className="dropdown-menu">
                <span className="material-symbols-outlined">menu</span>
                <div className="NavMenu">
                    <ol>
                        <li>
                            <Link className="NavLink" to="/">
                                Home
                            </Link>
                        </li>
                        {user && user.role === 'admin' &&
                            <li>
                                <Link className="NavLink" to="/private">Admin</Link>
                            </li>
                        }
                        {!user && (
                            <>
                                <li>
                                    <Link className="NavLink" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link className="NavLink" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {user &&
                            <li>
                                <Link className="NavLink" to='/gestion'>Account</Link>
                            </li>
                        }
                        {user && (
                            <li>
                                <button
                                    className="NavLogout"
                                    onClick={() => dispatch(logoutUser(goClientZone))}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
