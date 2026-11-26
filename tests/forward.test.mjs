import test from 'node:test';
import assert from 'node:assert/strict';
import { forward } from '../src/lib/forward.mjs';

const to = (path, search) => forward(path, search);

test('the front page goes to Explore, with or without the last slash', () => {
  assert.equal(to('/world-cuisine'), 'https://findish.now/explore/');
  assert.equal(to('/world-cuisine/'), 'https://findish.now/explore/');
});

test('a cuisine, dish, ingredient, photo or app file keeps its address', () => {
  assert.equal(to('/world-cuisine/dish/bibimbap/'), 'https://findish.now/explore/dish/bibimbap/');
  assert.equal(to('/world-cuisine/cuisine/thai-cuisine'), 'https://findish.now/explore/cuisine/thai-cuisine');
  assert.equal(to('/world-cuisine/ingredients/'), 'https://findish.now/explore/ingredients/');
  assert.equal(to('/world-cuisine/img/a/b/Photo.jpg'), 'https://findish.now/explore/img/a/b/Photo.jpg');
  assert.equal(to('/world-cuisine/app/web.html'), 'https://findish.now/explore/app/web.html');
});

test('pages that did not move as themselves go to the nearest thing', () => {
  assert.equal(to('/world-cuisine/about/'), 'https://findish.now/explore/');
  assert.equal(to('/world-cuisine/how-its-built'), 'https://findish.now/explore/');
  assert.equal(to('/world-cuisine/ingredient-map/'), 'https://findish.now/explore/ingredients/');
  assert.equal(to('/world-cuisine/share-about.png'), 'https://findish.now/explore/share.png');
});

test('the query string comes along', () => {
  assert.equal(to('/world-cuisine/app/', '?embed'), 'https://findish.now/explore/app/?embed');
});

test('a broken or hostile address still lands inside /explore/', () => {
  for (const path of ['/world-cuisine//evil.example/', '/world-cuisine/../../etc', '/world-cuisine/./x', '/somewhere-else']) {
    assert.ok(to(path).startsWith('https://findish.now/explore/'), path);
    assert.ok(!to(path).includes('..'), path);
    assert.ok(!to(path).slice('https://'.length).includes('//'), path);
  }
});
