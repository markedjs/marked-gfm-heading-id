var src = function(options = {}) {
  // extension code here

  return {
    tokenizer: {
      space(src) {
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

export default src;
