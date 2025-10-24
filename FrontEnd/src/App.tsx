import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import "./styles/global.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
