import GithubSlugger from 'github-slugger';
let slugger;

export function reset() {
  slugger = new GithubSlugger();
}

export function gfmHeadingId({ prefix = '' } = {}) {
  reset();

  return {
    renderer: {
      heading(text, level, raw) {
        raw = raw.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, '');
        return `<h${level} id="${prefix}${slugger.slug(raw)}">${text}</h${level}>\n`;
      }
    }
  };
}
