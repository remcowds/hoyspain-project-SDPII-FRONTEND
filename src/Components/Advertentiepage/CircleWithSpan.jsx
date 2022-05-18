import { AiOutlineCheckCircle } from 'react-icons/ai/';

export default function CircleWithSpan({ text, classNameP, classNameS }) {
	return (
		<p className={classNameP ?? 'text-sm flex'}>
			<AiOutlineCheckCircle color='green' size={21} />
			<span className={classNameS ?? 'pl-1'}>{text}</span>
		</p>
	);
}
