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

## Get heading list

`getHeadingList` is a function that is exported to provide the list of headings.

The headings will each be an object with the following properties:
 - `text`: The rendered HTML for the heading
 - `level`: The heading level (1-7)
 - `id`: The id given to the heading including any prefix

```js
import { marked } from "marked";
import { gfmHeadingId, getHeadingList } from "marked-gfm-heading-id";

marked.use(gfmHeadingId({prefix: "my-prefix-"}), {
	hooks: {
		postprocess(html) {
			const headings = getHeadingList();

			return `
<ul id="table-of-contents">
	${headings.map(({id, text, level}) => `<li><a href="#${id}" class="h${level}">${text}</a></li>`)}
</ul>
${html}`;
		}
	}
});

marked("# heading");
// <ul id="table-of-contents">
//   <li><a href="#my-prefix-heading" class="h1">heading</a></li>
// </ul>
// <h1 id="my-prefix-heading">heading</h1>
```

## Clear Heading List

`resetHeadings` is a function to purge the stored list of headings and reset the Slugger. This is only needed when the globalSlugs option ( see below) is set to true and you wish to reset the slugger and exportable Headers list.

## `options`

| option      |  type  | default | description                                   |
|-------------|--------|---------|:----------------------------------------------|
| prefix      | string |  `""`   | A string to prepend to all ids.               |
| globalSlugs | bool   | `false`   | Track ids from one use of marked to the next. This ensures unique headers when parsing multiple markdown fragments and rendering the results as a single document. When set to false, the slugger and headers lists are cleared on every marked run.

