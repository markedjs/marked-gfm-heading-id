import GithubSlugger from 'github-slugger';
let slugger = new GithubSlugger();
let lastSrc = '';
let headings = new Map();

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
          slugger = new GithubSlugger();
        }
        headings.set(src, []);
        this.options._thisSrc = lastSrc = src;
        return src;
      },
    },
    useNewRenderer: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const raw = unescape(this.parser.parseInline(tokens, this.parser.textRenderer))
          .trim()
          .replace(/<[!\/a-z].*?>/gi, '');
        const level = depth;
        const id = `${prefix}${slugger.slug(raw.toLowerCase())}`;
        const heading = { level, text, id, raw };
        headings.get(this.options._thisSrc).push(heading);

        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
    },
  };
}

export function getHeadingList(src) {
  return headings.get(src ?? lastSrc);
}

export function resetHeadings() {
  slugger = new GithubSlugger();
  lastSrc = '';
  headings = new Map();
}
