import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
