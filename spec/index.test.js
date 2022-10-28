import { marked } from 'marked';
import { gfmHeadingId, reset } from '../src/index.js';

describe('marked-gfm-heading-id', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(gfmHeadingId());
    const markdown = `
# heading

# heading
`.trimStart();

    const html = `
<h1 id="heading">heading</h1>
<h1 id="heading-1">heading</h1>
`.trimStart();
    expect(marked(markdown)).toBe(html);
  });

  test('prefix', () => {
    marked.use(gfmHeadingId({ prefix: 'my-prefix-' }));
    const markdown = `
# heading

# heading
`.trimStart();

    const html = `
<h1 id="my-prefix-heading">heading</h1>
<h1 id="my-prefix-heading-1">heading</h1>
`.trimStart();
    expect(marked(markdown)).toBe(html);
  });

  test('reset', () => {
    marked.use(gfmHeadingId());
    const markdown = `
# heading

# heading
`.trimStart();

    const html = `
<h1 id="heading">heading</h1>
<h1 id="heading-1">heading</h1>
`.trimStart();
    expect(marked(markdown)).toBe(html);
    reset();
    expect(marked(markdown)).toBe(html);
  });
});
