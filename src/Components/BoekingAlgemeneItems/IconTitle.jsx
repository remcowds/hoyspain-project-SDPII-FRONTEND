

export default function IconTitle(props){

    return (

        <>
            <div className="font-bold text-webgrijs">
                <span className="pr-2">
                {props.icon}
                </span>
                <span className="text-webgrijs text-2xl">{props.text}</span>
    
            </div>
        
        </>
    )
}