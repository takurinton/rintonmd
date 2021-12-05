import { Token } from './token';

// get text element
export const generateHTML = (ast: Token[]) => {
  const _ast = ast.map(a => a.content)
  .reverse()
  .join('');

  return _ast;
}

// is all token root ???
const isParentRoot = (tokens: Token[]) => {
  return tokens
  .map(token => token.parent?.elementType)
  .every(v => v === 'root');
}

const renderToHTML = ({
  currentToken,
  parentToken,
}: {
  currentToken: Token;
  parentToken: Token;
}) => {
  let content = '';

  // 改行による空文字対策
  if (!parentToken || !currentToken) {
    return '';
  }

  switch (parentToken.elementType) {
    case 'h1':
      content = `<h1 class="h1">${currentToken.content}</h1>`;
      break;
    case 'strong':
      content = `<strong class="strong">${currentToken.content}</strong>`;
      break;
  }
  return content;
}

// generate html string
export const generate = (astList: Token[][]) => {
  return astList.map(ast => {
    const parentToken = ast[0];
    const currentToken = ast[1];
    const html = renderToHTML({ currentToken, parentToken });
    return html;
  });
}