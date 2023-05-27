import { useEffect, useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { usePut, usePost } from "../_Hooks/Custom";
import { Alert } from "react-bootstrap";
import './PlanetForm.scss'



const PlanetForm = ({data = {}}) => {

    const [planet, setPlanet] = useState({
            name: "",
            distance: "",
            population: "",
            discoveryDate: "",
            gravity: "",
            temperature: "",
            image: ""
    });

    const [alertShow, setAlertShow] = useState(false);   // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState("");

    const putData = usePut("http://localhost:8090/planet", data.id); // Restituisce la funzione per il salvataggio dei dati

    const postData = usePost("http://localhost:8090/planet"); // Restituisce la funzione per la creazione dei dati 
 
    const navigate = useNavigate();  

    useEffect(() => {
        if(data.id > 0) {
            setPlanet({
                name: data.name,
                distance: data.distance,
                population: data.population,
                discoveryDate: data.discoveryDate ? data.discoveryDate : "",
                gravity: data.gravity,
                temperature: data.temperature,
                image: data.image
            })
        }
    }, [data])

    const getBase64 = async (file) => {

        const base64prefix = "data:image/jpeg;base64,"

        var reader = new FileReader();

        await reader.readAsDataURL(file);
        reader.onload = function () {
            setPlanet((prevValues) => {
                return {
                    ...prevValues,
                    "image": reader.result.replace(base64prefix, "")
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            getBase64(e.target.files[0])
        }
        setPlanet((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Codice per il salvataggio
        if(data.id > 0) {
            // se l'id è maggiore di 0 siamo in "edit"
            putData(planet, submitSucces);   // data -> planet; successFn -> submitSuccess (vedi Customs.jsx / usePut)   
        }
        else {
            // se l'id è undefined o 0 siamo in "new"/post
            postData(planet, submitSucces); 
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/planet", { replace: true });  // il replace è come se "interrompesse" la cronologia di navigazione
        //mutate();
    }


    const submitSucces = () => {
        setAlertMessage("Saved!");                
        setAlertShow(true);
    } 


    return (
        <>
        <form className="row">
            <div className="col-12">
                <FloatingLabel controlId="txtName" label="Name" className="my-2">
                    <input id="txtName" className="form-control" name="name" value={planet.name} onChange={handleChange} placeholder="Name"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtdistance" label="Distance" className="my-2">
                    <input id="txtdistance" className="form-control" name="distance" value={planet.distance} onChange={handleChange} placeholder="Distance"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtpopulation" label="Population" className="my-2">
                    <input id="txt" className="form-control" type="number" name="population" value={planet.population} onChange={handleChange} placeholder="Population"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtdiscovery" label="Discovery Year" className="my-2">
                    <input id="txtdiscovery" className="form-control" name="discoveryDate" value={planet.discoveryDate} onChange={handleChange} placeholder="Discovery Date"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtgravity" label="Gravity" className="my-2">
                    <input id="txtgravity" className="form-control" name="gravity" value={planet.gravity} onChange={handleChange} placeholder="Gravity"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txttemperature" label="Surface Temperature" className="my-2">
                    <input id="txttemperature" className="form-control" name="temperature" value={planet.temperature} onChange={handleChange} placeholder="Temperature"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtimage" label="Image" className="my-2">
                    <input id="txtimage" className="form-control" type="file" name="image" placeholder="Image"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <div className="d-flex justify-content-around">
                    <button className="btn btn-sm btn-outline-success" onClick={handleSubmit}>Save</button>
                    <Link className="btn btn-sm btn-outline-danger" to="/planets">Cancel</Link>
                </div>
            </div>
        </form>
        <Alert show={alertShow} onHide={alertDismiss} message={alertMessage}/>
        </>
    );
}

export default PlanetForm;