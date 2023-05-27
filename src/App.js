import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Exohouses from "./components/Exohouses/Exohouses";
import EditExohouse from "./components/ExohouseForm/EditExohouse";
import NewExohouse from "./components/ExohouseForm/NewExohouse";
import Planets from "./components/Planet/Planet";
import NewPlanet from "./components/PlanetForm/NewPlanet";
import EditPlanet from "./components/PlanetForm/EditPlanet";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Exohouses" element={<Exohouses />}>
            <Route path="edit/:id" element={<EditExohouse />} /> 
            <Route path="new" element={<NewExohouse/>} />
          </Route>
          <Route path="Planets" element={<Planets/>} />
          <Route path="Planets/new" element={<NewPlanet/>}/>
          <Route path="Planets/edit/:id" element={<EditPlanet/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;