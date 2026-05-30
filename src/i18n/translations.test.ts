import { describe, expect, it } from 'vitest';
import { dictionaries } from './translations';

describe('translations', () => {
  it('en and zh-TW have exactly the same keys', () => {
    const enKeys = Object.keys(dictionaries.en).sort();
    const zhKeys = Object.keys(dictionaries['zh-TW']).sort();
    expect(zhKeys).toEqual(enKeys);
  });

  it('has no empty translation values', () => {
    for (const [lang, dict] of Object.entries(dictionaries)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim(), `${lang}:${key}`).not.toBe('');
      }
    }
  });
});
