'use strict';

var GithubSlugger = require('github-slugger');

let slugger;

function reset() {
  slugger = new GithubSlugger();
}

function gfmHeadingId({ prefix = '' } = {}) {
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

exports.gfmHeadingId = gfmHeadingId;
exports.reset = reset;
