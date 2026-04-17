import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import FormattedDate from './FormattedDate.astro';

test('FormattedDate renders a <time> with ISO datetime', async () => {
	const date = new Date('2024-06-15T12:00:00.000Z');
	const container = await AstroContainer.create();
	const result = await container.renderToString(FormattedDate, {
		props: { date },
	});

	expect(result).toContain('datetime="2024-06-15T12:00:00.000Z"');
	expect(result).toMatch(/<time\b/);
});
