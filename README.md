# rintonmd

# What

rintonmd is a markdown parser made by [takurinton](https://twitter.com/takurinton).  
Various modules are provided individually, and the core package is provided with all the function.  
Now under construction. Only `h1` and `strong` tags can be rendered.

# Usage

Will be like this.  
For example, write the following markdown in TypeScript code.

```ts
import rintonmd from 'rintonmd';

const md = '# hello world';
const html = rintonmd(md);
console.log(html);
```


At that time, the following is output.

```html
<h1 class="h1">hello world</h1>
```

# feature

The following features will be provided.

- lexer
    - Passing a markdown for string gives the result of lexical analysis
- parser
    - Passing the result of the lexical analysis gives the AST
- generator
    - Passing AST will give you html
- core
    - Passing markdown will give you html

In addition, I will provide wrappers for react, vue, and svelte.  