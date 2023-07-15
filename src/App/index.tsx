import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import LanguageProvider from "context/LanguageProvider";
import FormProvider from "context/FormProvider";
import BackdropProvider from "context/BackdropProvider";
import DisclaimersProvider from "context/DisclaimersProvider";

const App = (): React.ReactElement => {
  return (
    <DisclaimersProvider>
      <BackdropProvider>
        <LanguageProvider>
          <FormProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />
              </Routes>
            </Router>
          </FormProvider>
        </LanguageProvider>
      </BackdropProvider>
    </DisclaimersProvider>
  );
};

export default App;
