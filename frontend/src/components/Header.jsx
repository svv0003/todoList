import {Link, NavLink} from "react-router-dom";
import React from "react";

const Header = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink to="/"
                         className="logo">
                    Todo App
                </NavLink>
                <ul className="nav-menu">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'}>
                            홈
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/todo"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'}>
                            할 일 목록
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;