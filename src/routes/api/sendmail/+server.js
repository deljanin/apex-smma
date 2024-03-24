import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRIDAPIKEY);

export const POST = async ({ request }) => {
	const body = await request.json();
	console.log(body);
	let mailHtml = '<ul>';
	for (var key in body) {
		mailHtml += `<li>${key}:  ${body[key]}</li>`;
	}
	mailHtml += '</ul>';

	const msg = {
		to: 'pecadeljanin@gmail.com',
		from: 'petar@deljanin.dev',
		subject: 'Kontak forma websajt',
		html: mailHtml
	};
	try {
		await sgMail.send(msg);
		return new Response('Email sent', { status: 200 });
	} catch (error) {
		console.error(error);

		return new Response('Failed to send email', { status: 500 });
	}
};
