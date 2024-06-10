import type {MarkedExtension, marked} from 'marked';

/** Options for configuring marked-gfm-heading-id extension */
interface GfmHeadingIdOptions {
  /** A string to prepend to all ids. Empty by default. */
  prefix?: string;
}

/**
 * Add `id` attribute to headings (h1, h2, h3, etc) like GitHub.
 *
 * @param options Options for the extension
 * @returns A {@link marked.MarkedExtension | MarkedExtension} to be passed
 *     to {@link marked.use | `marked.use()`}
 */
export function gfmHeadingId(options?: GfmHeadingIdOptions): MarkedExtension;

/**
 * Headings information, can be used to create table of content
 */
export interface HeadingData {
  level: number;
  text: string;
  id: string;
}

/**
 * Returns a list of headings with the ids as computed by gfmHeadingId
 *
 * @returns An array of HeadingData with level, text and id.
 */
export function getHeadingList(): HeadingData[];

/**
 * Clears the stored list of Headings as computed by gfmHeadingId
 */
export function resetHeadings(): void;
