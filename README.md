# marked-gfm-heading-id

Add ids to headings like GitHub.

# Usage

```js
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-gfm-heading-id/lib/index.umd.js"></script>

const options = {
	prefix: "my-prefix-",
};

marked.use(gfmHeadingId(options));

marked("# heading");
// <h1 id="my-prefix-heading">heading</h1>
```

## `options`

| option |  type  | default | description                     |
|--------|--------|---------|:--------------------------------|
| prefix | string |  `""`   | A string to prepend to all ids. |
