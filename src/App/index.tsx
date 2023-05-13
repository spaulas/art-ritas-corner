import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Details from "../pages/Details";
import Main from "../pages/Main";
import LanguageProvider from "components/LanguageProvider";

const App = (): React.ReactElement => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
