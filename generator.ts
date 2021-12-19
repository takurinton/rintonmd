import { Token, MergedToken } from './token';

// get text element
export const generateHTML = (ast: Token[]) => {
  return ast.map(a => a.content)
  .reverse()
  .join('');
}

// is all token root ???
const isParentRoot = (tokens: Token[] | MergedToken[]) => {
  return tokens
  .map(token => token.parent?.elementType)
  .every(v => v === 'root');
}

const getPos = (content: string) => {
  let state = 0;
  const closeTagParentheses = ['<', '>'];
  let position = 0;
  content.split('').some((c, i) => {
    if (state === 1 && c === closeTagParentheses[state]) {
      position = i;
      return true;
    } else if (state === 0 && c === closeTagParentheses[state]) {
      state++;
    }
  });
  return position + 1;
};

// 
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
    case 'li':
      content = `<li class="li">${currentToken.content}</li>`;
      break;
    case 'ul':
      content = `<ul class="ul">${currentToken.content}</ul>`;
      break;
    case 'merged': // マージ済み token 使ってみた
      const pos = getPos(parentToken.content);
      content = `${parentToken.content.slice(0, pos)}${currentToken.content}${parentToken.content.slice(pos)}`;
  }
  return content;
}

// generate html string
export const generate = (astList: Token[][]) => {
  return astList.map(l => {
    let remakeAst = l.reverse();

    // ルートに行くまで下から舐める
    while (!isParentRoot(remakeAst)) {
      let idx = 0;
      while (idx < remakeAst.length) {
        if (remakeAst[idx].parent.elementType === 'root') {
          idx += 1; // root なのでインクリメントして次のループで break
        } else {
          // root じゃなかったら続く
          const currentToken = remakeAst[idx]; // 現在のトークンを取得
          remakeAst = remakeAst.filter((_, token) => token !== idx); // 現在のトークンを削除する
          const parentIdx = remakeAst.findIndex((token) => token.id === currentToken.parent.id); // 親を取得
          const parentToken = remakeAst[parentIdx];

          // エムスリーのブログを参考にしてやってみた（見たことない書き方だったので）
          // > 多分トークンをマージしてASTを作り替えていく仕組みは新規性があります。
          const mergedToken = {
            id: parentToken.id,
            elementType: 'merged',
            content: renderToHTML({ currentToken, parentToken }),
            parent: parentToken.parent,
          };
          // 親と子を merge
          remakeAst.splice(parentIdx, 1, mergedToken);
        }
      }
    }
    return generateHTML(remakeAst);
  }).join('');
}