import GithubSlugger from 'github-slugger';
let slugger = new GithubSlugger();

let headings = [];

export function gfmHeadingId({ prefix = '', globalSlugs = false } = {}) {
  return {
    headerIds: false, // prevent deprecation warning; remove this once headerIds option is removed
    hooks: {
      preprocess(src) {
        if (!globalSlugs) {
          resetHeadings();
        }
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

        return `<h${level} id="${id}">${text}</h${level}>\n`;
      }
    }
  };
}

export function getHeadingList() {
  return headings;
}

export function resetHeadings() {
  headings = [];
  slugger = new GithubSlugger();
}
