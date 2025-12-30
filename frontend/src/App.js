import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import TodoList from "./pages/TodoList";
import PrivateRoute from "./provider/PrivateRoute";
import TodoDetail from "./pages/TodoDetail";
import TodoWrite from "./pages/TodoWrite";
import NotificationToast from "./components/NotificationToast";

function App() {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            if(savedUser && token) {
                return JSON.parse(savedUser);
            }
            return null;
        } catch (err) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    })

    return (
        <div>
            <NotificationToast/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                    <Route path="/todo"
                           element={
                               // <PrivateRoute>
                                   <TodoList />
                               // </PrivateRoute>
                               }/>
                    <Route path="/todo/:id"
                           element={
                               // <PrivateRoute>
                                   <TodoDetail />
                               // </PrivateRoute>
                                }/>
                    <Route path="/todo/write"
                           element={
                               // <PrivateRoute>
                                   <TodoWrite />
                               // </PrivateRoute>
                                }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;