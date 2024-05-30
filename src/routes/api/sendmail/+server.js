import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailerSend = new MailerSend({
	apiKey: process.env.EMAIL_API_KEY
});

const sentFrom = new Sender('contact@apex-smma.com', 'Apex SMMA');

const recipients = [new Recipient('contact@apex-smma.com', 'Apex SMMA')];

let emailParams;

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body.extraText != '' || !body.extraText) {
		let mailHtml = '<table>';
		for (var key in body) {
			mailHtml += `<tr><td>${key}</td><td>${body[key]}</td></tr>`;
		}
		mailHtml += '</table>';

		emailParams = new EmailParams()
			.setFrom(sentFrom)
			.setTo(recipients)
			.setReplyTo(sentFrom)
			.setSubject('Contact form apex-smma.com')
			.setHtml(mailHtml)
			.setText(body.toString());
		try {
			await mailerSend.email.send(emailParams);
			return new Response({ status: 200 });
		} catch (error) {
			console.error(error);

			return new Response({ status: 500 });
		}
	} else return new Response({ status: 403 });
};
