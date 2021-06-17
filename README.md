# marked-gfm-heading-id

Add ids to headings like GitHub.

# Usage

```js
const marked = require("marked");
const gfmHeadingId = require("marked-gfm-heading-id");

// or ES Module script
// import marked from "https://cdn.jsdelivr.net/gh/markedjs/marked/lib/marked.esm.js";
// import gfmHeadingId from "https://cdn.jsdelivr.net/gh/UziTech/marked-gfm-heading-id/lib/index.mjs";

const options = {
	prefix: "my-prefix-",
};

marked.use(gfmHeadingId(options));

marked("# heading");
// <h1 id="my-prefix-heading">heading</h1>
```

## `reset`

If you want to reset the heading list between `marked` calls you must call `reset`.

```js
marked.use(gfmHeadingId());

marked("# heading\n\n# heading");
gfmHeadingId.reset();
marked("# heading\n\n# heading");
```

## `options`

| option |  type  | default | description                     |
|--------|--------|---------|:--------------------------------|
| prefix | string |  `""`   | A string to prepend to all ids. |
