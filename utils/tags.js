export const getTagHref = (tag) => {
	return "/tag/" + encodeURIComponent(tag.trim().toLowerCase().replace(/ /g, '-'));
};
