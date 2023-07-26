export default {
	async fetch(fp: String): Promise<Response> {
		const openpgp_url = "https://keys.openpgp.org/vks/v1/by-fingerprint/";

		// sleep for 100ms to avoid rate limiting
		await new Promise(r => setTimeout(r, 100));

		let res = await fetch(openpgp_url+fp);

		res = new Response(res.body, res);

		// set headers to display the response as plain text
		res.headers.set('Content-Type', 'text/plain');
		res.headers.set('Content-Disposition', 'inline');

		return res;
	},
};
