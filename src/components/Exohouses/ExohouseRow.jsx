
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useGet, useDelete } from "../_Hooks/Custom";
import { URL_PLANET, URL_EXOHOUSE } from "../_Utils/Constants";
import './Exohouses.scss'



const ExohouseRow = ({exohouse, deleteSuccess})=> {

    const base64prefix = "data:image/jpeg;base64,"

    const {data: planet, error: planetError} = useGet(URL_PLANET, exohouse.idPlanet );

    const deleteData = useDelete(URL_EXOHOUSE, exohouse.id);

    const performDelete = () => {
       deleteData(deleteSuccess);
        
    }
  

    return (
        <>
        <tr>
            <td className=" align-middle">
                <Link className="btn text-info" to={"edit/" + exohouse.id}>
                    <FontAwesomeIcon icon={faPencil}/>
                </Link>
                <button className="btn text-danger"onClick={performDelete}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                </button>
            </td>
            <td className="align-middle">
                    <img src={base64prefix + exohouse.image} style={{width: "80%", height: "80%"}}/>
                </td>
            <td>
               <div>{exohouse.name}</div> 
               <div className=" small">{planet ? planet.name : ""}</div> 
            </td>
            <td className=" align-middle">{exohouse.capacity}</td>
        </tr>
        </>

    );
}


export default ExohouseRow;