import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";
import { DashBoardPage } from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
        </Routes>

        <Routes>
          <Route path="/dashboard" Component={DashBoardPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
