import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

test('theme storage failure is contained before the embed loader', () => {
  const persistenceGuard = source.indexOf("try {\n            localStorage.setItem('qc-theme', t);");
  const persistenceCatch = source.indexOf('} catch (error) {\n            // Theme persistence is best-effort; storage may be blocked.', persistenceGuard);
  const loader = source.indexOf('document.body.appendChild(s);', persistenceCatch);

  assert.notEqual(persistenceGuard, -1, 'theme persistence must be guarded');
  assert.ok(persistenceCatch > persistenceGuard, 'storage exception must be caught');
  assert.ok(loader > persistenceCatch, 'embed loader must remain after guarded persistence');
});
