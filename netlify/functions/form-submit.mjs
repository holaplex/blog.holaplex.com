import fetch from 'node-fetch'

const API_KEY = '3841815d511d5700e48b83dfb49e57b9daf264993f6fb66af923005c0973e7f3eb08a5a7';

export const handler = async function (event, context) {
	const data = JSON.parse(event.body);
	const options = {
		body: JSON.stringify({
			contact: {
				'email': data.email,
			}
		}),

		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Api-Token': API_KEY,
		}
	};

	try {
		let contactResponse = await fetch('https://holaplex2.api-us1.com/api/3/contacts', options);
		contactResponse = await contactResponse.json();

		let contactID = 0;

		if (contactResponse.errors) {
			if (contactResponse.errors[0].code === 'duplicate') {
				let searchResponse = await fetch('https://holaplex2.api-us1.com/api/3/contacts?email=' + encodeURIComponent(data.email), {
					headers: {
						'Accept': 'application/json',
						'Api-Token': API_KEY,
					}
				});
				searchResponse = await searchResponse.json();
				contactID = searchResponse.contacts[0].id
			} else {
				throw contactResponse.errors
			}
		} else {
			contactID = contactResponse.contact.id;
		}

		let listResponse = await fetch('https://holaplex2.api-us1.com/api/3/contactLists', {
			...options,
			body: JSON.stringify({
				contactList: {
					contact: contactID,
					list: 3,
					status: 1,
				}
			})
		});
		listResponse = await listResponse.json();

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Thanks for signing up!", data: listResponse }),
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Something went wrong, please try again later", error: e }),
		};
	}
}