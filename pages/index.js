import config from "../lib/config";
import { countPosts, getCategories, listPostContent, getFeaturedPosts } from "../lib/posts";

import BlogIndex from "../components/blogIndex";
export default BlogIndex;

export const getStaticProps = async (context) => {
	const posts = listPostContent(1, config.posts_per_page);
	const categories = getCategories();
	const pagination = {
		current: 1,
		pages: Math.ceil(countPosts() / config.posts_per_page),
	};
	const featured = getFeaturedPosts();
	return {
		props: {
			posts,
			pagination,
			categories,
			featured,
			page: 0,
		},
	};
};
