import ExohouseForm from "./ExohouseForm";
import { useOutletContext, useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Custom";
import './Exohouse.scss'

const EditExohouse = () => {

    const { id } = useParams();

    const { data, error } = useGet("http://localhost:8090/exohouses", id);

    const { mutate } = useOutletContext(); // useOutletContext permette di reperire le proprietà e o funzioni passate al context dall'outlet (vedi exohouses.jsx)


    if (data) {
        return (
            <>
                <div className="m-2 p-2 border">

                    <h5>Edit Exohouse</h5>
                    <ExohouseForm data={data} mutate={mutate} />
                </div>

            </>
        );
    }
}

export default EditExohouse;

