import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  const datePipe = new DatePipe();

  describe('transform', () => {
    it('should return the formatted date based on the default config if no format is specified', () => {
      const value = datePipe.transform('2001-02-03T12:34:56.000Z');

      expect(value).toBe('2001-02-03');
    });

    it('should return the formatted date based on the format if it is specified', () => {
      const value = datePipe.transform('2001-02-03', 'MMMM Do YYYY');

      expect(value).toBe('February 3rd 2001');
    });

    it('should return the provided value as is if the parsed value is invalid', () => {
      const value = datePipe.transform('foo');

      expect(value).toBe('foo');
    });
  });
});
