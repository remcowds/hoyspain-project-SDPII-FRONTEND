export default function ImageDetail(props) {
	const { image, alt, styling, onclick } = props;

	const className =
		'object-cover w-full h-full cursor-pointer hover:opacity-80 '.concat(
			styling
		);

	return (
		<img src={image} alt={alt} className={className} onClick={onclick} />
	);
}
