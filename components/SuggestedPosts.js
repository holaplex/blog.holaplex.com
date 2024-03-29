import Link from "next/link";
import { formatSlug } from "../utils/formatSlug";

export default function SuggestedPosts({ posts }) {
	return (
		<div className="flex lg:gap-4 gap-2 items-center justify-center flex-wrap">
			{posts.map((post) => (
				<div className="p-2 border border-gray-600 my-4 rounded-md lg:w-1/4 max-w-xs" key={post.slug}>
					<Link href={"/post/" + formatSlug(post.slug)}>
						<a>
							{post.image && <img
								src={"/" + post.image}
								className="w-full mx-auto border border-gray-800 rounded-md aspect-video object-cover"
								alt="" />}
							<div className="truncate mt-2 text-xs">{post.title}</div>
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}
