import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Repo from "./page/repo";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/repo/:nomeUser/:idUser" element={<Repo/>}/>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
