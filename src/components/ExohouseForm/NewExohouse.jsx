import ExohouseForm from "./ExohouseForm";
import { useOutletContext } from "react-router-dom";
import './Exohouse.scss'

const NewExohouse = () => {


    const { mutate } = useOutletContext(); // useOutletContext permette di reperire le proprietà e o funzioni passate al context dall'outlet (vedi exohouses.jsx)

    return (
        <>
            <div className="m-2 p-2 border">

                <h5>New Exohouse</h5>
                <ExohouseForm mutate={mutate} />
            </div>

        </>
    )
}

export default NewExohouse;

