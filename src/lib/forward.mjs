// Where an old kylepace.dev/world-cuisine/ address lives on finDish.
// World cuisine became finDish's Explore section on 2026-11-26 (findish.now/explore/).
// Almost every address keeps its shape; the few that don't are listed here.
// Tests: tests/forward.test.mjs.

export const NEW_HOME = 'https://findish.now/explore/';

// Pages that didn't move as themselves. finDish has no separate About or
// How it's built page for Explore: /explore/ carries the credits.
const MOVED = new Map([
  ['about', ''],
  ['how-its-built', ''],
  ['ingredient-map', 'ingredients/'],
  ['share-about.png', 'share.png'],
]);

/**
 * @param {string} pathname the path asked for, e.g. "/world-cuisine/dish/bibimbap/"
 * @param {string} [search] the query string, with its "?" (or "")
 * @returns {string} the full finDish address to send the visitor to
 */
export function forward(pathname, search = '') {
  let rest = pathname.replace(/^\/world-cuisine(?:\/|$)/, '');
  // A path with ".." or a second slash at the start could point outside /explore/.
  rest = rest
    .split('/')
    .filter((part, i, all) => part !== '..' && part !== '.' && (part !== '' || i === all.length - 1))
    .join('/');
  const key = rest.replace(/\/$/, '');
  if (MOVED.has(key)) rest = MOVED.get(key);
  return NEW_HOME + rest + (search || '');
}
