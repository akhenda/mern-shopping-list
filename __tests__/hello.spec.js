import hello from '../index';

describe('hello', () => {
  it('should return a greeting to the parameter', () => {
    const greeting = hello('world');

    expect(greeting).toBe('Hello world!');
  });
});
