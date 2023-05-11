import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Details from "../pages/Details";
import Main from "../pages/Main";

const App = (): React.ReactElement => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;