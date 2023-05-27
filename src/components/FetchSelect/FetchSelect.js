import { useGet } from "../_Hooks/Custom";

const FetchSelect = ({className, name, value,onChange, url}) => {

    const {data} = useGet(url);

    if(data) {
  return (
    <select className={className} name={name} value={value} onChange={onChange}>
            <option value={0}> - - Select - - - </option>
            {data.map(item => <option key={item.id} value={item.id}>{item.name}</option>)} {/* <option value="1"> Rock </option>*/}
    </select>
  );
}

return (
    <select className=" form-control form-control-sm">
         <option value={0}> - - Select - - - </option>
    </select>
);

}

export default FetchSelect;