import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import TodoList from "./pages/TodoList";
import PrivateRoute from "./provider/PrivateRoute";
import TodoDetail from "./pages/TodoDetail";
import TodoWrite from "./pages/TodoWrite";
import NotificationToast from "./components/NotificationToast";

function App() {
    // const [user, setUser] = useState(() => {
    //     try {
    //         // console.log('NotificationToast:', NotificationToast);
    //         console.log('TodoList:', TodoList);
    //         console.log('TodoDetail:', TodoDetail);
    //         console.log('TodoWrite:', TodoWrite);
    //
    //         const savedUser = localStorage.getItem("user");
    //         const token = localStorage.getItem("token");
    //         if(savedUser && token) {
    //             return JSON.parse(savedUser);
    //         }
    //         return null;
    //     } catch (err) {
    //         localStorage.removeItem("user");
    //         localStorage.removeItem("token");
    //     }
    // })

    return (
        <>
            {/*<NotificationToast/>*/}
            <BrowserRouter>
                <div className="app">
                    <nav className="navbar">
                        <div className="nav-container">
                            <h2 className="logo">Todo App</h2>
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

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<TodoList />} />
                            <Route path="/todo/:id" element={<TodoDetail />} />
                            <Route path="/todo/write" element={<TodoWrite />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </>
    );
}

const Home = () => {
    return (
        <div className="home-page">
            <h1>할 일 관리 시스템</h1>
            <p>효율적으로 업무를 관리하세요!</p>
            <NavLink to="/todo" className="start-btn">
                시작하기 →
            </NavLink>
        </div>
    );
}

export default App;