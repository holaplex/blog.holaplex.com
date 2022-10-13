import Link from "next/link";

export default function PostThumbnail({ post }) {
	return (
		<div className="max-w-xs" title={post.title}>
			<Link href={"/post/" + post.slug}>
				<a>
					{post.image && <img
						src={"/" + post.image}
						className="w-full mx-auto aspect-video object-cover border border-gray-200 rounded-md"
						alt="" />}
					<div className="truncate mt-1 mb-2 text-xs">{post.title}</div>
				</a>
			</Link>
		</div>
	);
}
