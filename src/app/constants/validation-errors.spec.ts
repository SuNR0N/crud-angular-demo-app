import {
  isbn10Checksum,
  isbn10Length,
  isbn13Checksum,
  isbn13Length,
} from './validation-errors';

describe('validation errors', () => {
  describe('isbn10Checksum', () => {
    it('should be "Invalid ISBN-10 (Checksum failure)"', () => {
      expect(isbn10Checksum).toBe('Invalid ISBN-10 (Checksum failure)');
    });
  });

  describe('isbn10Length', () => {
    it('should be "Invalid ISBN-10 (Must be 10 characters long)"', () => {
      expect(isbn10Length).toBe('Invalid ISBN-10 (Must be 10 characters long)');
    });
  });

  describe('isbn13Checksum', () => {
    it('should be "Invalid ISBN-13 (Checksum failure)"', () => {
      expect(isbn13Checksum).toBe('Invalid ISBN-13 (Checksum failure)');
    });
  });

  describe('isbn13Length', () => {
    it('should be "Invalid ISBN-13 (Must be 13 characters long)"', () => {
      expect(isbn13Length).toBe('Invalid ISBN-13 (Must be 13 characters long)');
    });
  });
});
