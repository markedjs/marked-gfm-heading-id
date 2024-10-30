import { marked } from 'marked';
import { getHeadingList, gfmHeadingId, resetHeadings } from '../src/index.js';

describe('marked-gfm-heading-id', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('no options', () => {
    marked.use(gfmHeadingId());
    const markdown = `
# heading

# heading
`;

    expect(marked(markdown)).toMatchInlineSnapshot(`
"<h1 id="heading">heading</h1>
<h1 id="heading-1">heading</h1>
"
`);
  });

  test('prefix', () => {
    marked.use(gfmHeadingId({ prefix: 'my-prefix-' }));
    const markdown = `
# heading

# heading
`;

    expect(marked(markdown)).toMatchInlineSnapshot(`
"<h1 id="my-prefix-heading">heading</h1>
<h1 id="my-prefix-heading-1">heading</h1>
"
`);
  });

  test('reset for new marked call', () => {
    marked.use(gfmHeadingId());
    const markdown = `
# heading

# heading
`;

    expect(marked(markdown)).toMatchInlineSnapshot(`
"<h1 id="heading">heading</h1>
<h1 id="heading-1">heading</h1>
"
`);
    expect(marked(markdown)).toMatchInlineSnapshot(`
"<h1 id="heading">heading</h1>
<h1 id="heading-1">heading</h1>
"
`);
  });

  test('weird headings', () => {
    let headings = [];
    marked.use(gfmHeadingId(), {
      hooks: {
        postprocess(html) {
          headings = getHeadingList();
          return html;
        },
      },
    });

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

# just Cap<Tags with>spaces
`;

    expect(marked(markdown)).toMatchInlineSnapshot(`
"<h1 id="foo-1">foo 1</h1>
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
<h1 id="just-capspaces">just Cap<Tags with>spaces</h1>
"
`);

    expect(headings.length).toBe(19);
    expect(headings[0].id).toBe('foo-1');
    expect(headings[0].raw).toBe('foo 1');
    expect(headings[1].id).toBe('foo');
    expect(headings[1].raw).toBe('foo');
    expect(headings[2].id).toBe('foo-2');
    expect(headings[2].raw).toBe('foo');
    expect(headings[3].id).toBe('html-in-header');
    expect(headings[3].raw).toBe('Html in header');
    expect(headings[4].id).toBe('just-test');
    expect(headings[4].raw).toBe('just test');
    expect(headings[5].id).toBe('just-test-2');
    expect(headings[5].raw).toBe('just test 2');
    expect(headings[6].id).toBe('just--test-2-spaces-');
    expect(headings[6].raw).toBe('just  test 2 spaces ');
    expect(headings[7].id).toBe('just-test-3');
    expect(headings[7].raw).toBe('just test 3');
    expect(headings[8].id).toBe('just-test-4');
    expect(headings[8].raw).toBe('just test 4');
    expect(headings[9].id).toBe('just-non-tags');
    expect(headings[9].raw).toBe('just non tags');
    expect(headings[10].id).toBe('just-spaces');
    expect(headings[10].raw).toBe('just spaces');
    expect(headings[11].id).toBe('just--weird-chars');
    expect(headings[11].raw).toBe('just #$% weird chars');
    expect(headings[12].id).toBe('followed-by-weird-chars');
    expect(headings[12].raw).toBe('followed by#$% weird chars');
    expect(headings[13].id).toBe('followed--space-then-weird-chars');
    expect(headings[13].raw).toBe('followed  space then weird chars');
    expect(headings[14].id).toBe('');
    expect(headings[15].id).toBe('comment-');
    expect(headings[15].raw).toBe('comment ');
    expect(headings[16].id).toBe('hello-world');
    expect(headings[16].raw).toBe('Hello world!');
    expect(headings[17].id).toBe('hello-world-1');
    expect(headings[17].raw).toBe('Hello world!');
    expect(headings[18].id).toBe('just-capspaces');
    expect(headings[18].raw).toBe('just Capspaces');
  });

  test('globalSlugs usage - No Clearing.', () => {
    marked.use(gfmHeadingId({ globalSlugs: true }));
    const markdownOne = `
  # foo 1

  # foo

  # foo
  `;
    const markdownTwo = `
  # foo 1

  # foo

  # foo
  `;
    expect(marked(markdownOne)).toMatchInlineSnapshot(`
"<h1 id="foo-1-1">foo 1</h1>
<h1 id="foo-3">foo</h1>
<h1 id="foo-4">foo</h1>
"
`);
    expect(marked(markdownTwo)).toMatchInlineSnapshot(`
"<h1 id="foo-1-2">foo 1</h1>
<h1 id="foo-5">foo</h1>
<h1 id="foo-6">foo</h1>
"
`);
  });

  test('globalSlugs usage - Pre-Clearing.', () => {
    resetHeadings();
    marked.use(gfmHeadingId({ globalSlugs: true }));
    const markdownOne = `
  # foo 1

  # foo

  # foo
  `;
    const markdownTwo = `
  # foo 1

  # foo

  # foo
  `;
    expect(marked(markdownOne)).toMatchInlineSnapshot(`
"<h1 id="foo-1">foo 1</h1>
<h1 id="foo">foo</h1>
<h1 id="foo-2">foo</h1>
"
`);
    expect(marked(markdownTwo)).toMatchInlineSnapshot(`
"<h1 id="foo-1-1">foo 1</h1>
<h1 id="foo-3">foo</h1>
<h1 id="foo-4">foo</h1>
"
`);
  });

  test('globalSlugs usage - Pre and middle clearing.', () => {
    resetHeadings();
    marked.use(gfmHeadingId({ globalSlugs: true }));
    const markdownOne = `
  # foo 1

  # foo

  # foo
  `;
    const markdownTwo = `
  # foo 1

  # foo

  # foo
  `;
    expect(marked(markdownOne)).toMatchInlineSnapshot(`
"<h1 id="foo-1">foo 1</h1>
<h1 id="foo">foo</h1>
<h1 id="foo-2">foo</h1>
"
`);
    resetHeadings();
    expect(marked(markdownTwo)).toMatchInlineSnapshot(`
"<h1 id="foo-1">foo 1</h1>
<h1 id="foo">foo</h1>
<h1 id="foo-2">foo</h1>
"
`);
  });

  test('getHeadingList - multiple calls', () => {
    marked.use(gfmHeadingId());
    const markdownOne = `
  # foo 1

  # foo

  # foo
  `;
    const markdownTwo = `
  # foo 2

  # foo

  # foo
  `;
    marked(markdownOne);
    marked(markdownTwo);

    expect(getHeadingList(markdownOne)).toMatchInlineSnapshot(`
[
  {
    "id": "foo-1",
    "level": 1,
    "text": "foo 1",
  },
  {
    "id": "foo",
    "level": 1,
    "text": "foo",
  },
  {
    "id": "foo-2",
    "level": 1,
    "text": "foo",
  },
]
`);
    expect(getHeadingList(markdownTwo)).toMatchInlineSnapshot(`
[
  {
    "id": "foo-2",
    "level": 1,
    "text": "foo 2",
  },
  {
    "id": "foo",
    "level": 1,
    "text": "foo",
  },
  {
    "id": "foo-1",
    "level": 1,
    "text": "foo",
  },
]
`);
  });
});
