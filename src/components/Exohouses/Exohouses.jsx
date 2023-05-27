
import Table from 'react-bootstrap/Table';
import ExohouseRow from "./ExohouseRow";
import { Outlet, Link } from "react-router-dom";
import { useGet } from '../_Hooks/Custom';
import { useState } from 'react';
import { Alert } from 'bootstrap';
import { URL_EXOHOUSE } from '../_Utils/Constants';
import './Exohouses.scss'

const Exohouses = () => {

    const { data, error, isLoading, mutate } = useGet(URL_EXOHOUSE);

    const [alertShow, setAlertShow] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");

    const alertDismiss = () => {
        setAlertShow(false);
        mutate();
    }

    const deleteSuccess = ()=> {
        setAlertMessage("Exohouse correctly destroyed");
        setAlertShow(true);
    }




    if (data) {

        return (
            <div className="container">
                <Link className="btn btn-sm btn-outline-success" to="new">New Exohouse </Link>
                <Outlet context={{ mutate }} /> {/* L'attributo context permette di passare proprietà e/o funzioni al componente che verrà renderizzato  */}
                <h4>Exohouse List</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Capacity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(exohouse => (
                            <ExohouseRow key={exohouse.id} exohouse={exohouse} deleteSuccess={deleteSuccess} />
                        ))}
                    </tbody>
                </Table>

                <Alert show={alertShow} onHide={alertDismiss } message={ AlertMessage} />

            </div>
        );
    }
}

export default Exohouses;