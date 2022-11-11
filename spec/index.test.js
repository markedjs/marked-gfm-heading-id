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

  test('weird headings', () => {
    marked.use(gfmHeadingId());
    const markdown = `
# foo 1

# foo

# foo

# Html in <em>header</em>

# just <tags>test
  
# just <tags>test 2</tags>
  
# just <tags> test 2 spaces </tags>
  
# just <tags>test 3</any>
  
# just <tags>test 4<any>
  
# just <non tags
  
# just <tags with>spaces

# just <#$%> weird chars

# followed <by#$%> weird chars

# followed <by test="$%^"> space then weird chars

# <!---->

# comment <!-- inside -->

# Hello **world!**

# <samp>Hello <ins>world!</ins></samp>
`.trimStart();

    const html = `
<h1 id="foo-1">foo 1</h1>
<h1 id="foo">foo</h1>
<h1 id="foo-2">foo</h1>
<h1 id="html-in-header">Html in <em>header</em></h1>
<h1 id="just-test">just <tags>test</h1>
<h1 id="just-test-2">just <tags>test 2</tags></h1>
<h1 id="just--test-2-spaces-">just <tags> test 2 spaces </tags></h1>
<h1 id="just-test-3">just <tags>test 3</any></h1>
<h1 id="just-test-4">just <tags>test 4<any></h1>
<h1 id="just-non-tags">just &lt;non tags</h1>
<h1 id="just-spaces">just <tags with>spaces</h1>
<h1 id="just--weird-chars">just &lt;#$%&gt; weird chars</h1>
<h1 id="followed-by-weird-chars">followed &lt;by#$%&gt; weird chars</h1>
<h1 id="followed--space-then-weird-chars">followed <by test="$%^"> space then weird chars</h1>
<h1 id=""><!----></h1>
<h1 id="comment-">comment <!-- inside --></h1>
<h1 id="hello-world">Hello <strong>world!</strong></h1>
<h1 id="hello-world-1"><samp>Hello <ins>world!</ins></samp></h1>
`.trimStart();
    expect(marked(markdown)).toBe(html);
  });
});
