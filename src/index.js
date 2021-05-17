module.exports = function(options = {}) {
  // extension code here

  return {
    tokenizer: {
      paragraph(src) {
        if (src !== 'example markdown') {
          return false;
        }

        return {
          type: 'paragraph',
          raw: src,
          text: 'example html'
        };
      }
    }
  };
};
