import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const postsDirectory = path.join(process.cwd(), "content/posts");

let postCache;

export function fetchPostContent() {
	if (postCache) {
		return postCache;
	}
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames
		.filter((it) => it.endsWith(".mdx"))
		.map((fileName) => {
			// Read markdown file as string
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");

			// Use gray-matter to parse the post metadata section
			const matterResult = matter(fileContents, {
				engines: {
					yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
				},
			});
			const matterData = matterResult.data;
			matterData.fullPath = fullPath;

			const slug = fileName.replace(/\.mdx$/, "");

			// Validate slug string
			if (matterData.slug !== slug) {
				throw new Error(
					"slug field not match with the path of its content source"
				);
			}

			return matterData;
		});
	// Sort posts by date
	postCache = allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
	return postCache;
}

export function countPosts(tag) {
	return fetchPostContent().filter(
		(it) => !tag || (it.tags && it.tags.includes(tag))
	).length;
}
export function getCategories() {
	const categoriesObject = {};
	const posts = fetchPostContent();
	for (let index = 0; index < posts.length; index++) {
		const post = posts[index];
		if (post.tags) {
			for (let index = 0; index < post.tags.length; index++) {
				const tag = post.tags[index];
				if (categoriesObject.hasOwnProperty(tag)) {
					categoriesObject[tag]++;
				} else {
					categoriesObject[tag] = 1;
				}
			}
		}
	}

	const categories = [];
	for (const key in categoriesObject) {
		categories.push({ name: key, count: categoriesObject[key] });
	}
	categories.sort((a, b) => a.count > b.count);
	return categories;
}

export function listPostContent(page, limit) {
	return fetchPostContent()
		.filter((it) => !it.draftmode)
		.slice((page - 1) * limit, page * limit);
}