import { marked } from 'marked';
import { gfmHeadingId } from '../src/index.js';

const options = {
  prefix: 'my-prefix-',
};

marked.use(gfmHeadingId(options));

marked('# heading');
