import axios from "axios";
import md5 from "blueimp-md5";
import { useState } from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import Loader from "@/components/Loader";
import ComicsCard from "@/components/ComicsCard";
import Head from "next/head";

export async function getServerSideProps() {
	const baseURL = "https://gateway.marvel.com/v1/public/comics";
	const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
	const privateKey = process.env.MARVEL_PRIVATE_KEY;
	const timestamp = new Date().getTime();
	const hash = md5(timestamp + privateKey + publicKey);
	const url = `${baseURL}?apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;

	try {
		const response = await axios.get(url);
		const comics = response.data.data.results;
		return { props: { comics } };
	} catch (error) {
		console.log(error);
		return { props: { comics: [] } };
	}
}

function ComicsPage({ comics }) {
	const [comicsList, setComicsList] = useState(comics);
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(0);

	const loadMoreComics = async () => {
		if (loading) return;

		setLoading(true);

		try {
			const newComics = await axios.get("/api/fetch-more-comics", {
				params: { offset: offset + 20 },
			});
			setComicsList([...comicsList, ...newComics.data]);

			setOffset(offset + 20);
		} catch (error) {
			console.error(error);
		}

		setLoading(false);
	};

	// Remove duplicates from comicsList based on id
	const uniqueComics = comicsList.filter(
		(comic, index, arr) => arr.findIndex((c) => c.id === comic.id) === index
	);

	return (
		<>
			<Head>
				<title>Marvel Explorer</title>
			</Head>
			<header className='bg-[#202020] shadow'>
				<div className='mx-auto py-6 px-4 sm:px-6 lg:px-8'>
					<h1 className='text-2xl font-bold text-orange-500 text-center'>
						Marvel Explorer
					</h1>
				</div>
			</header>

			<section>
				<div className='py-2 m-4 grid gap-2 lg:grid-cols-4 md:grid-cols-2'>
					{uniqueComics.map((comic) => (
						<ComicsCard key={comic.id} comic={comic} />
					))}
				</div>
				{loading && <Loader />}
				<InfiniteScroll loadMoreComics={loadMoreComics} />
			</section>
		</>
	);
}

export default ComicsPage;
