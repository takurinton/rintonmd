import rintonmd from '../index';

test('h1', () => {
    expect(rintonmd('# hello world')).toBe('<h1 class="h1">hello world</h1>');
});