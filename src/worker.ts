import handleReque from './proxy';

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const valid_chars = /^[A-F0-9]+$/;

		if (url.searchParams.has('fp')) {
			const fingerprint = url.searchParams.get('fp').toUpperCase();

			// max length of a fingerprint is 40 chars 
			// min length of a fingerprint is 20 chars 
			// fingerprint is a uppercase hex string

			if (fingerprint && valid_chars.test(fingerprint) && fingerprint.length > 20 && fingerprint.length < 41) {
				return handleReque.fetch(fingerprint);
			} 
			return new Response(
				'<h1>400 Bad request </h1>\
				 <h2>Invalid `fp` (fingerprint) query param</h2>\
				 <p>It should be a valid fingerprint (40 upper hex chars)</p>\
				 ',
				{ status: 400, headers: { 'Content-Type': 'text/html' } },
				);
		}

		return new Response(
			'<h1>400 Bad request </h1>\
			 <h2>Missing `fp` (fingerprint) query param</h2>\
			 <p>You can find the fingerprint by email at: \
			 <a href="https://keys.openpgp.org/">https://keys.openpgp.org/</a>\
			 </p>\
			 ',
			{ status: 400, headers: { 'Content-Type': 'text/html' } },
			);
	},
};
