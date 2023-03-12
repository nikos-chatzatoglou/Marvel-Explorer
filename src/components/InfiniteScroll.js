import { useEffect, useRef } from "react";

const InfiniteScroll = ({ loadMoreComics }) => {
	const observer = useRef();

	useEffect(() => {
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreComics();
				}
			},
			{ rootMargin: "400px" }
		);

		observer.current.observe(document.querySelector("#scroll-target"));

		return () => {
			observer.current.disconnect();
		};
	}, [loadMoreComics]);

	return <div id='scroll-target' />;
};

export default InfiniteScroll;
