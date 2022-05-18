export default function BetaalBlokje(props) {
    return (

        <>


            <div className="border-2 text-webgrijs p-2 rounded-lg mt-4 pl-4 cursor-pointer" onClick={() => props.functie(props.label)}>
                <input className="cursor-pointer form-check-input appearance-none rounded-full h-6 w-6 border-2 border-gray-300 bg-white checked:bg-weboranje 
                            checked:border-weboranje focus:outline-none transition duration-200 bg-no-repeat
                            bg-contain mr-3 -pointer" checked={props.bm ===props.label} readOnly type="radio" name="flexRadioDefault" value={props.label} id="flexRadioDefault10"
                />
                <div className={`text-xl  mb-4 ml-2  font-semibold   border-weblichtgrijs inline-block align-middle`}>
                    <div className="inline">
                        <img src={props.img} className="rounded-2xl w-20 inline pr-2" alt="Betalingswijze" />
                        <span>
                            {props.label}
                        </span>
                    </div>
                </div>
            </div>


        </>
    )
}