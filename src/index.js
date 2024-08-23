import GithubSlugger from 'github-slugger';
let slugger = new GithubSlugger();

let headings = [];

// unescape from marked helpers
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
/* istanbul ignore next */
export function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

export function gfmHeadingId({ prefix = '', globalSlugs = false } = {}) {
  return {
    headerIds: false, // prevent deprecation warning; remove this once headerIds option is removed
    hooks: {
      preprocess(src) {
        if (!globalSlugs) {
          resetHeadings();
        }
        return src;
      },
    },
    useNewRenderer: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const raw = unescape(this.parser.parseInline(tokens, this.parser.textRenderer))
          .toLowerCase()
          .trim()
          .replace(/<[!\/a-z].*?>/gi, '');
        const level = depth;
        const id = `${prefix}${slugger.slug(raw)}`;
        const heading = { level, text, id, raw };
        headings.push(heading);

        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
    },
  };
}

export function getHeadingList() {
  return headings;
}

export function resetHeadings() {
  headings = [];
  slugger = new GithubSlugger();
}
