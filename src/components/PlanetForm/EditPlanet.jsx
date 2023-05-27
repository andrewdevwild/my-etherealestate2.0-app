import { useParams } from "react-router-dom";
import PlanetForm from "./PlanetForm";
import { useGet } from "../_Hooks/Custom";
import './PlanetForm.scss'





const EditPlanet = () => {

  const { id } = useParams();

  const { data, error } = useGet("http://localhost:8090/planet", id)

  if (data) {
    return (

      <div className="container">
        <h5>Edit Planet</h5>
        <PlanetForm data={data} />
      </div>
    );
  }
}

export default EditPlanet;