const GithubSlugger = require('github-slugger');
let slugger;

function reset() {
  slugger = new GithubSlugger();
}

module.exports = ({ prefix = '' } = {}) => {
  reset();

  return {
    renderer: {
      heading(text, level, raw) {
        return `<h${level} id="${prefix}${slugger.slug(raw)}">${text}</h${level}>\n`;
      }
    }
  };
};

module.exports.reset = reset;
