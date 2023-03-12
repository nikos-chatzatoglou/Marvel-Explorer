import Image from "next/image";

const ComicsCard = ({ comic }) => {
	const priceName = (name) => {
		// Split the string based on the capital letters and store it to words array
		const words = name.split(/(?=[A-Z])/);
		//[print,Price]
		// Capitalize the first letter of each word
		const capitalizedWords = words.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1)
		);
		//[Print,Price]
		const capitalizedString = capitalizedWords.join(" ");
		return capitalizedString;
	};

	return (
		<div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg'>
			<div className='w-full lg:max-w-sm flex justify-center'>
				<Image
					className='my-2 rounded-lg'
					src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
					alt={comic.title}
					width={300}
					height={450}
				/>
			</div>
			<section className='p-2 text-orange-500'>
				<h2 className='text-lg font-bold'>{comic.title}</h2>
				<p className='text-gray-200'>Issue Number: {comic.issueNumber}</p>
				<ul className='text-gray-200'>
					{comic.prices.map((price) => (
						<li key={`${price.type}`}>
							{priceName(price.type)}: {price.price}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default ComicsCard;
