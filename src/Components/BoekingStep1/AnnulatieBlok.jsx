

const AnnulatieBlok = (props) =>{
	
	return (
		<>
			<div className='border-2 rounded-2xl text-lg mx-5 border-weblichtgrijs p-2 text-weblichtgrijs mb-5 cursor-pointer' onClick={() => props.hdChange(props.value, ((props.reissom)*parseFloat(props.percentage)/100).toFixed(2))}>
				{props.extra && (
					<div className='font-bold rounded-full text-weblichtgroen border-weblichtgroen ml-7 border-2 text-xs w-max p-2'>
						{props.extra}
					</div>
				)}
				<label className="inline-flex items-center cursor-pointer">
				<div className="form-check">
					<input readOnly className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-weboranje 
					checked:border-weboranje focus:outline-none transition duration-200 my-1 align-top bg-no-repeat 
					bg-center bg-contain float-left mr-2 cursor-pointer" checked={props.value===props.default} type="radio" name="flexRadioDefault" value={props.label} id="flexRadioDefault10" 
					/>
				</div>
					<span className="ml-2 cursor-pointer">{props.label} ({props.percentage}%)</span>
				</label>
				<div className='float-right text-2xl'>€{Math.round(((props.reissom)*parseFloat(props.percentage)/100) * 100) / 100}</div>
			</div>
		</>
	);
}


export default AnnulatieBlok;
