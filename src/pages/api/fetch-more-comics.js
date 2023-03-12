import axios from "axios";
import md5 from "blueimp-md5";

export default async function handler(req, res) {
	const baseURL = "https://gateway.marvel.com/v1/public/comics";
	const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
	const privateKey = process.env.MARVEL_PRIVATE_KEY;
	const timestamp = new Date().getTime();
	const hash = md5(timestamp + privateKey + publicKey);
	const url = `${baseURL}?apikey=${publicKey}&hash=${hash}&ts=${timestamp}&offset=${req.query.offset}&limit=20`;

	try {
		const response = await axios.get(url);
		const data = response.data.data.results;
		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
