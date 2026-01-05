import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import TodoList from "./pages/TodoList";
import PrivateRoute from "./provider/PrivateRoute";
import TodoDetail from "./pages/TodoDetail";
import TodoWrite from "./pages/TodoWrite";
import NotificationToast from "./components/NotificationToast";
import Header from "./components/Header";
import LedgerList from "./pages/LedgerList";
import LedgerWrite from "./pages/LedgerWrite";

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
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<TodoList />} />
                            <Route path="/todo/:id" element={<TodoDetail />} />
                            <Route path="/todo/write" element={<TodoWrite />} />
                            <Route path="/ledger" element={<LedgerList />} />
                            <Route path="/ledger/write" element={<LedgerWrite />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </>
    );
}

const Home = () => {
    return (
        <>
        <div className="home-page">
            <h1>업무 관리</h1>
            <p>효율적으로 업무를 관리하세요!</p>
            <NavLink to="/todo"
                     className="start-btn">
                시작하기
            </NavLink>
        </div>
        <div className="home-page">
            <h1>가계 관리</h1>
            <p>효율적으로 자산을 관리하세요!</p>
            <NavLink to="/ledger"
                     className="start-btn">
                시작하기
            </NavLink>
        </div>
        </>
    );
}

export default App;