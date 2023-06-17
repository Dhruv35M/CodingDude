import "./App.css";
import Home from "./pages/Home";
import Navbar from "./shared/Navbar";
import Settings from "./pages/Settings";
import "./index.css";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import appInit from "./initialzeApp";
import NoInternetConnection from "./shared/NoInternetConnection";

function App() {
  useEffect(() => {
    appInit();
  }, []);

  return (
    <>
      <Navbar />
      <NoInternetConnection>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </NoInternetConnection>
    </>
  );
}

export default App;
