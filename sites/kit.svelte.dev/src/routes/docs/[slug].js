import { dev, prerendering } from '$app/env';
import { read } from '$lib/docs/server';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	// TODO https://github.com/sveltejs/kit/issues/4093
	if (!prerendering && !dev) {
		return { status: 404 };
	}

	const page = await read('docs', params.slug);

	if (!page) {
		return { status: 404 };
	}

	return {
		body: {
			prev: page.prev,
			next: page.next,
			section: {
				file: page.section.file,
				title: page.section.title,
				content: page.section.content
			}
		}
	};
}
