const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatDate = (date) => {
	const dateObj = new Date(date);

	const month = dateObj.getMonth() + 1;
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();

	return `${months[month - 1].substring(0, 3)} ${day}, ${year}`;
};

export default formatDate;
