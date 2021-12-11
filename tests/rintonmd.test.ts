import rintonmd from '../index';

test('h1', () => {
    expect(rintonmd('# hello world')).toBe('<h1 class="h1">hello world</h1>');
});

test('strong', () => {
    expect(rintonmd('**takurinton**')).toBe('<strong class="strong">takurinton</strong>');
});

// test('plain text', () => {
//     expect(rintonmd('takurinton')).toBe('takurinton');
// });