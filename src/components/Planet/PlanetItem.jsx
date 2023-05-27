import { Link } from "react-router-dom";
import { useDelete, useGet } from "../_Hooks/Custom";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import './Planet.scss'


const PlanetItem = ({ planet, deleteSuccess }) => {

    const base64prefix = "data:image/jpeg;base64,"
    
    const [showDelete, setShowDelete] = useState(false);

    const { data: exohouses, error } = useGet("http://localhost:8090/planet/" + planet.id + "/exohouse")


    const deleteData = useDelete("http://localhost:8090/planet", planet.id )

    const performDelete = () => {
        deleteData(deleteSuccess);
     };

    return (
        <article className="col-12">
            <div className="m-2 p-2 border">
                <div className="row">
                    <div className="col-12">
                        {planet.name}
                    </div>
                    <div className="col-6">
                        {planet.population ? planet.population : " No population yet"}
                    </div>
                    <div className="col-6">
                        {planet.discoveryDate ? planet.discoveryDate : "Date not defined"}
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-around">
                            <Link className="btn btn-outline-info" to={"edit/" + planet.id}>
                                Edit
                            </Link>
                            <button className="btn btn-outline-danger" onClick={()=>{setShowDelete(true)}}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <td className="align-middle">
                    <img src={base64prefix + planet.image} style={{width: "80%", height: "80%"}} alt="image-planet"/>
                </td>
                    <div className="col-12">
                        <Alert className="mt-2" show={showDelete} variant="danger">
                            <Alert.Heading>Delete {planet.name} ? </Alert.Heading>
                            {exohouses && exohouses.length > 0 ? 
                            (
                                <p>
                                Will be also deleted: {exohouses.length} exohouse/s. Would you like to proceed ?
                            </p>

                            )
                            : "" }
                            
                            
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-success btn-sm me-2" onClick={performDelete}>
                                    Confirm
                                </button>
                                <button  className="btn btn-outline-danger btn-sm me-2" onClick={() => setShowDelete(false)}>
                                    Cancel
                                </button>
                            </div>
                        </Alert>

                    </div>

                </div>
            </div>

        </article>

    );
}

export default PlanetItem;