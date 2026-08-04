import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Library from "./components/Library";
import DiscoverBooks from "./components/DiscoverBooks";


function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>

            <Routes>
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route 
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/library"
                    element={<Library />}
                />

                <Route
                    path="/discover"
                    element={<DiscoverBooks />}
                />
                        
            </Routes>

        </BrowserRouter>
  )
}

export default App
