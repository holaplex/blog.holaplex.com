import React, { useState } from "react";

const NewsletterForm = () => {
	const [inprogress, setInprogress] = useState(false);
	const [message, setMessage] = useState(false);

	return <div className="w-full mx-auto flex justify-center flex-col gap-1 max-w-sm">
		<form className="w-full mx-auto flex justify-center gap-1" onSubmit={async function (e) {
			setInprogress(true);
			setMessage(false);
			e.preventDefault();

			try {
				const response = await fetch('/.netlify/functions/form-submit', {
					body: JSON.stringify({
						email: e.target.email.value
					}),
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const data = await response.json();

				setMessage(data.message);
				if (!data.error) {
					e.target.email.value = '';
				}
			} catch (e) {
				setMessage("There was an error signing you up, please try again later or follow us on social.");
				console.error(e);
			}
			setInprogress(false);
		}}>
			<input type='email' disabled={inprogress} name='email' className="w-full text-white px-2 rounded border border-gray-400 bg-transparent" />
			<input type='submit' disabled={inprogress} className="rounded text-white px-2 border border-gray-400" />
		</form>

		{
			message ? <div className="border border-gray-600 rounded p-2 text-center">
				{message}
			</div> : <></>
		}
	</div>
};

export default NewsletterForm;