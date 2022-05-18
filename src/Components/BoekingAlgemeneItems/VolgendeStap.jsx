import { ArrowForwardIos } from "@mui/icons-material";

export default function VolgendeStap(props) {
  return (
    <>
      <input
        type="submit"
        onClick={props.naarVolgende}
        className={`bg-weboranje text-white font-bold rounded-lg text-lg p-3 disabled:bg-weblichtgrijs ${props.disabled===false?"hover:cursor-pointer":""}`}
        disabled={props.disabled}
		    value={props.btnLabel }
      />
        {/* <ArrowForwardIos /> */}
        
      
    </>
  );
}
