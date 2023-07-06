/**
 * @jest-environment jsdom
 */

import likesCounter from './src/modules/likesCounter.js';

describe('Items Count', () => {
  test('0 for no items', () => {
    document.body.innerHTML = `
    <div id="tvShows">
    </div>
    `;
    expect(likesCounter()).toBe(0);
  });

  test('1 item', () => {
    document.body.innerHTML = `
    <div id="tvShows">
      <div class="item"></div>
    </div>
    `;
    expect(likesCounter()).toBe(1);
  });

  test('more than 2', () => {
    document.body.innerHTML = `
    <div id="tvShows">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    `;
    expect(likesCounter()).toBe(4);
  });

  test('30 items', () => {
    document.body.innerHTML = `
    <div id="tvShows">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    `;
    expect(likesCounter()).toBe(30);
  });

  test('Too much items', () => {
    document.body.innerHTML = `
    <div id="tvShows">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    `;
    expect(likesCounter()).toBe('Error');
  });
});
