import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Store from './components/Store';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/store"
          element={<Store />}
        />
      </Routes>
    </Router>
    )
}

export default App;
