import { Link } from "react-router-dom";

export default function KlikHier(props){
    return(
        <span className="text-weboranje underline">
            <Link to={props.to}>
                {props.text}
            </Link>
        </span>

    )
}