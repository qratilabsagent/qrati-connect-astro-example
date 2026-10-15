import assert from 'node:assert/strict';
import test from 'node:test';

import { initGtm } from '../src/lib/cookieConsent.ts';

test('GTM starts with all consent categories denied before loading the tag', () => {
  const commands = [];
  const scripts = [];
  globalThis.window = {
    dataLayer: [],
    gtag(...args) {
      commands.push(args);
    },
  };
  globalThis.document = {
    getElementById() {
      return null;
    },
    createElement() {
      return {};
    },
    head: {
      appendChild(script) {
        scripts.push(script);
      },
    },
  };

  try {
    initGtm('GTM-TEST');

    assert.deepEqual(commands[0], [
      'consent',
      'default',
      {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-TEST');
  } finally {
    delete globalThis.window;
    delete globalThis.document;
  }
});
