import GithubSlugger from 'github-slugger';
let slugger;

let headings = [];

export function gfmHeadingId({ prefix = '', focusable = false } = {}) {
  return {
    headerIds: false, // prevent deprecation warning; remove this once headerIds option is removed
    hooks: {
      preprocess(src) {
        headings = [];
        slugger = new GithubSlugger();
        return src;
      }
    },
    renderer: {
      heading(text, level, raw) {
        raw = raw
          .toLowerCase()
          .trim()
          .replace(/<[!\/a-z].*?>/gi, '');
        const id = `${prefix}${slugger.slug(raw)}`;
        const heading = { level, text, id };
        headings.push(heading);

        return `<h${level} id="${id}"${focusable ? ' tabindex="-1"' : ''}>${text}</h${level}>\n`;
      }
    }
  };
}

export function getHeadingList() {
  return headings;
}
