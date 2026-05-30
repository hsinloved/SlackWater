import { describe, expect, it } from 'vitest';
import { LESSONS, type Localized } from './lessons';

function assertLocalized(value: Localized, where: string) {
  expect(value.en?.trim(), `${where} en`).toBeTruthy();
  expect(value['zh-TW']?.trim(), `${where} zh-TW`).toBeTruthy();
}

describe('lessons', () => {
  it('has unique ids', () => {
    const ids = LESSONS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every lesson and block is fully bilingual', () => {
    for (const lesson of LESSONS) {
      assertLocalized(lesson.title, `${lesson.id}.title`);
      assertLocalized(lesson.summary, `${lesson.id}.summary`);
      expect(lesson.blocks.length, `${lesson.id} blocks`).toBeGreaterThan(0);
      lesson.blocks.forEach((block, i) => {
        if (block.type === 'list') {
          expect(block.items.length, `${lesson.id} block ${i} items`).toBeGreaterThan(0);
          block.items.forEach((item, j) =>
            assertLocalized(item, `${lesson.id} block ${i} item ${j}`),
          );
        } else {
          assertLocalized(block.text, `${lesson.id} block ${i}`);
        }
      });
    }
  });
});
