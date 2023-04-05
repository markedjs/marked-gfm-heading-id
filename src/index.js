import GithubSlugger from 'github-slugger';
let slugger;

export function gfmHeadingId({ prefix = '' } = {}) {
  return {
    hooks: {
      preprocess(src) {
        slugger = new GithubSlugger();
        return src;
      }
    },
    renderer: {
      heading(text, level, raw) {
        raw = raw.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '');
        return `<h${level} id="${prefix}${slugger.slug(raw)}">${text}</h${level}>\n`;
      }
    }
  };
}
