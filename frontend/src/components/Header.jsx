import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">Todo</Link>
            <div className="nav-links">
                <NavLink to="/">메인</NavLink>
                <NavLink to="/todo">할일</NavLink>
                <NavLink to="/todo/write">글쓰기</NavLink>
            </div>
        </nav>
    )
}

export default Header;