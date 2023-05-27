import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { usePut, usePost } from "../_Hooks/Custom";
import FetchSelect from "../FetchSelect/FetchSelect";
import Alert from "../Alert/Alert";
import './Exohouse.scss'

const ExohouseForm = ({ data = {}, mutate }) => {

    const [exohouse, setExohouse] = useState({
        name: "",
        idPlanet: 0,
        capacity: 0,
        price: 0.0,
        isAvailable: true,
        image: "",
    })

    const [alertShow, setAlertShow] = useState(false); // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState(""); //  // Variabile di stato per gestire il messaggio dell'alert

    const putData = usePut("http://localhost:8090/exohouses", data.id); // usePut restituisce la funzione per il salvataggio dei dati

    const postData = usePost("http://localhost:8090/exohouses"); // // usePost restituiesce la funzione per la cereazione dato dei dati

    const navigate = useNavigate();

    useEffect(() => {
        if (data.id > 0) {
            setExohouse({
                name: data.name,
                idPlanet: data.idPlanet,
                capacity: data.capacity,
                price: data.price,
                isAvailable: data.isAvailable,
                image: data.image,
            });
        }
    }, 
    
    [data.id, data.name, data.idPlanet, data.capacity, data.price, data.isAvailabel, data.image])

    const getBase64 = async (file) => {

        const base64prefix = "data:image/jpeg;base64,"

        var reader = new FileReader();       // Creo il file reader per leggere il file  

        await reader.readAsDataURL(file);   // con il metodo "readsAsDataUrl" leggo i dati del file passato come parametro
        reader.onload = function () {           // creo una funzione di load che viene eseguita in modo asincrono quando il caricamento è completato
            setExohouse((prevValues) => {       // quando il file è caricato viene eseguito il setExohouse sul campo apposito
                return {
                    ...prevValues,
                    "image": reader.result.replace(base64prefix, "")  // Con replace sul result, rimuovo il prefisso di base64
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
        setExohouse((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Codice per Salvataggio
        if (data.id > 0) {
            putData(exohouse, submitSuccess); // data -> exohouse; successFn -> submitSuccess ( vedi Customs.jsx / usePut)
        }
        else {
            postData(exohouse, submitSuccess);
        }

    }

    const submitSuccess = () => {
        setAlertMessage("Exohouse correctly deployed on the Planet")
        setAlertShow(true);
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/exohouses", { replace: true });
        mutate();
    }

    return (

        <>

            <form className=" row" onSubmit={handleSubmit}>
                <div className=" col-6">
                    <label className=" form-label">Name</label>
                    <input className=" form-control form-control-sm" name="name" value={exohouse.name} onChange={handleChange} />
                </div>
                <div className=" col-6">
                    <label className=" form-label">Planet</label>
                    <FetchSelect className=" form-control form-control-sm" name="idPlanet" value={exohouse.idPlanet} onChange={handleChange} url={"http://localhost:8090/planet"} />
                </div>
                <div className=" col-4">
                    <label className=" form-label">Capacity</label>
                    <input className=" form-control form-control-sm" type="number" name="capacity" value={exohouse.capacity.substring(0, 10)} onChange={handleChange} />
                </div>
                <div className=" col-2">
                    <label className=" form-label">Is Available</label>
                    <input className=" form-control form-control-sm" defaultValue={true} name="isAvailable" value={exohouse.isAvailable} onChange={handleChange} />
                </div>
                <div className=" col-2">
                    <label className=" form-label">Price</label>
                    <input className=" form-control form-control-sm" type="number" min={5} name="price" value={exohouse.price} onChange={handleChange} />
                </div>
                <div className=" col-12">
                    <label className=" form-label">Image</label>
                    <input className=" form-control form-control-sm" type="file" name="image"/>
                </div>
                <div className="col-12">
                    <div className=" d-flex justify-content-around mt-3">
                        <button className=" btn btn-success " type="submit">Save</button>
                        <Link className=" btn btn-outline-danger " to="/exohouses">Cancel</Link>
                    </div>
                </div>
            </form>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
        </>
    );
}
export default ExohouseForm;