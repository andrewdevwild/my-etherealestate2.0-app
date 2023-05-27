import { Link } from "react-router-dom";
import { useGet } from "../_Hooks/Custom";
import PlanetItem from "./PlanetItem";
import Alert from "../Alert/Alert";
import { useState } from "react";
import './Planet.scss'


const Planet = () => {

    const { data, error, mutate } = useGet("http://localhost:8090/planet");

    const [alertShow, setAlertShow] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");

    const alertDismiss = () => {
        setAlertShow(false);
        mutate();
    }

    const deleteSuccess = ()=> {
        setAlertMessage("Self-Detonation correctly occurred");
        setAlertShow(true);
    }


    if (data) {
        return (

            <>
                <div className="container">
                    <h5> Planet</h5>
                    <Link to="new" className="btn btn-outline-success btn-sm">New Planet</Link>
                    <div className="row">
                        {data.map(planet => (
                            <PlanetItem key={planet.id} planet={planet}  deleteSuccess={deleteSuccess}/>
                        ))}
                    </div>
                </div>
                <Alert show={alertShow} onHide={alertDismiss} message={AlertMessage}/>
            </>


        );
    }
}

export default Planet;