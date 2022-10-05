import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent, getSuggestedPosts } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";

import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Layout from "../../components/layout";
import Metadata from "../../components/metadata";
import GenericContent from "../../components/genericContent";
import Section from "../../components/section";
import Container from "../../components/container";
import formatDate from "../../utils/formatDate";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { getTagHref } from "../../utils/tags";
import SuggestedPosts from "../../components/SuggestedPosts";
import NewsletterForm from "../../components/newsletter-form";
import formatTagName from "../../utils/formatTagName";
import { formatSlug } from "../../utils/formatSlug";

const components = { YouTube, TwitterTweetEmbed };
const slugToPostContent = ((postContents) => {
	let hash = {};
	postContents.forEach((it) => (hash[it.slug] = it));
	return hash;
})(fetchPostContent());

export default function Post({ title, dateString, slug, description, source, image, tags, suggested, gamingNewsletter }) {
	const Tags = [];
	for (let index = 0; index < tags.length; index++) {
		const tag = tags[index];
		Tags.push(
			<Link key={tag} href={getTagHref(tag)}>
				<a className="text-white">{formatTagName(tag)}</a>
			</Link>
		);
	}
	const content = hydrate(source, { components });

	let newsletter;
	if (gamingNewsletter) {
		newsletter = <div className="text-center bg-gray-900 px-4 py-6 rounded-md">
			<p className="font-bold text-center text-white">Subscribe to Web3 Gaming Weekly</p>
			<p className="text-center mt-2 mb-6">Stay on top of all the latest web3 gaming news, releases, and more by signing up to our weekly newsletter. Straight to your inbox, every Friday.</p>
			<NewsletterForm listID={4} />
		</div>
	} else {
		newsletter = <div className="text-center bg-gray-900 px-4 py-6 rounded-md">
			<p className="font-bold text-center text-white">Stay up to date with Holaplex</p>
			<NewsletterForm listID={3} />
		</div>
	}

	return (
		<Layout newsletter={false}>
			<Metadata title={title} date={parseISO(dateString)} slug={slug} description={description} />
			<Section>
				<Container>
					<div className="w-full lg:w-11/12 mx-auto">
						<h1 className="mt-0">{title}</h1>
					</div>
					{image && <img src={"/" + image} className="w-full mx-auto my-4" alt="" />}
					<p className="my-4 flex gap-4 flex-wrap justify-center">
						<span>{formatDate(dateString)}</span>
						{tags.length > 0 ? (
							<>
								<span>-</span>
								{Tags}
							</>
						) : (
							<></>
						)}
					</p>
					<div className="w-full lg:w-11/12 mx-auto">
						<GenericContent>{content}</GenericContent>
						{newsletter}
					</div>
					<div className="mt-12 w-full flex justify-center items-center flex-wrap gap-4 text-xl">
						<div className="text-center w-full text-sm">Share on</div>
						<a onClick={openLinkInPopup} target="_blank" rel="noreferrer" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("https://blog.holaplex.com/post/" + slug)}>
							<FaTwitter />
						</a>
						<a onClick={openLinkInPopup} target="_blank" rel="noreferrer" href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://blog.holaplex.com/post/" + slug)}>
							<FaFacebook />
						</a>
						<a onClick={openLinkInPopup} target="_blank" rel="noreferrer" href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://blog.holaplex.com/post/" + slug)}>
							<FaLinkedin />
						</a>
					</div>
					<div className="text-center mt-4">
						<h3 className="font-semibold">Continue Reading:</h3>
						<SuggestedPosts posts={suggested} />
					</div>
				</Container>
			</Section>
		</Layout>
	);
}

function openLinkInPopup(e) {
	const n = e.nativeEvent;
	let url = false;
	let target = n.target;
	for (let i = 0; i < 10; i++) {
		if (target.getAttribute("href")) {
			url = target.getAttribute("href");
			break;
		} else if (target.parentElement) {
			target = target.parentElement;
		}
	}
	if (!url) return;
	window.open(url, "popup", "width=600,height=600");
	n.preventDefault();
}

export const getStaticPaths = async () => {
	const paths = fetchPostContent().map((it) => "/post/" + formatSlug(it.slug));
	return {
		paths,
		fallback: false,
	};
};

const replaceTags = (content) => {
	return content.replace(/(<br>|<br >)/gi, "<br />").replace(/(<hr>|<hr >)/gi, "<hr />");
};

export const getStaticProps = async ({ params }) => {
	const slug = params.post;
	const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
	const { content, data } = matter(source.replace(/\]\(uploads\//g, "](/uploads/"), {
		engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
	});
	const mdxSource = await renderToString(replaceTags(content), { components, scope: data });
	const suggested = getSuggestedPosts(data.tags, data.slug).splice(0, 3);
	return {
		props: {
			title: data.title,
			dateString: data.date,
			slug: formatSlug(data.slug),
			description: data.description || "",
			image: data.image ? data.image : false,
			source: mdxSource,
			tags: data.tags ? data.tags : [],
			suggested: suggested,
			gamingNewsletter: !!data.gamingNewsletter,
		},
	};
};
