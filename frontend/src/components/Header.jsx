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
                            업무
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ledger"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'}>
                            가계부
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;