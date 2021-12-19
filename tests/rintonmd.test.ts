import rintonmd from '../index';

test('h1', () => {
    expect(rintonmd('# hello world')).toBe('<h1 class="h1">hello world</h1>');
});

test('strong', () => {
    expect(rintonmd(`
**takurinton**
`))
    .toBe('<strong class="strong">takurinton</strong>');
});

test('li1', () => {
    expect(rintonmd(`
* takurinton
`)).toBe(`<ul class="ul"><li class="li">takurinton</li></ul>`);
});

// test('li1', () => {
//     expect(rintonmd(`
// * takurinton
// * hoge
// `)).toBe(`<ul class="ul"><li class="li">takurinton</li><li class="li">hoge</li></ul>`);
// });

// test('plain text', () => {
//     expect(rintonmd('takurinton')).toBe('takurinton');
// });