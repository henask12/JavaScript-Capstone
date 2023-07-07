import { describe, test, expect } from '@jest/globals';
import countComments from './src/modules/commentsCounter.js';

describe('countComments', () => {
  test('It should return 0 when there are no comments.', () => {
    // Arrange
    const comments = [];

    // Act
    const result = countComments(comments);

    // Assert
    expect(result).toBe(0);
  });

  test('It should return the correct amount of comments', () => {
    // Arrange
    const comments = ['Comment 1', 'Comment 2', 'Comment 3', 'comment 4'];

    // Act
    const result = countComments(comments);

    // Assert
    expect(result).toBe(4);
  });
});
