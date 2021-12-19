import { getH1Element, getLiElement, getStrongElement, getTextElement, getUlElement } from "./lexer";
import { matchH1, matchLi, matchStrong } from './rules';
import type { Token } from "./token";

const root: Token = {
  id: 0,
  elementType: 'root',
  content: '',
  parent: {} as Token,
}

// tokenize function 
// text to ast
const tokenize = ({
  textElement,
  initId = 0,
  initRoot = root,
}: {
  textElement: string;
  initId?: number;
  initRoot?: Token;
}) => {
  let els: Token[] = [];
  let id = initId;
  let parent: Token = initRoot;

  const _tokenize = (textElement: string, _parent: Token) => {
    let t = textElement;
    parent = _parent;

    while (t.length !== 0) {
      const matchStrongText = matchStrong(t) as RegExpMatchArray; // strong match
      const matchH1Text = matchH1(t) as RegExpMatchArray; // h1 match
      const matchLiText = matchLi(t) as RegExpMatchArray; // li match

      if (matchStrongText) {
        // aaa**bb**cc の時の対応
        // 参考: https://www.m3tech.blog/entry/2021/08/23/124000
        if (Number(matchStrongText.index) > 0) {
          const _t = t.substring(0, Number(matchStrongText.index));
          id += 1;
          const _tEl = getTextElement({
            id,
            content: _t,
            parent,
          });
          els.push(_tEl);
          t = t.replace(_t, '');
        }

        id += 1;
        const el = getStrongElement({
          id,
          content: '',
          parent
        });
        parent = el;
        els.push(el);

        t = t.replace(matchStrongText[0], ''); // 読んだやつを消す、これがないと無限ループになる
        _tokenize(matchStrongText[1], parent); // 最初即時実行関数でやろうとしてたけど、再帰できないから定義した。
        parent = _parent;
      } else if (matchH1Text) {
        id += 1;
        const el = getH1Element({
          id,
          content: '',
          parent
        });
        parent = el;
        els.push(el);

        t = t.replace(matchH1Text[0], '');
        _tokenize(matchH1Text[1], parent);
      } else if (matchLiText) {
        let _id = 0;
        const rootUlToken = getUlElement({
          id: _id,
          content: '',
          parent: root
        });

        _id += 1;
        let tokens = [rootUlToken];
        const listToken = getLiElement({
          id: _id,
          content: '',
          parent: rootUlToken
        });

        tokens.push(listToken);
        const listText = [{
          id: _id,
          content: matchLiText[3],
          elementType: 'text',
          parent: listToken,
        }];
        tokens.push(...listText);
        _id += listText.length;
        els.push(...tokens);
        return;
      } else {
        id += 1;
        const text = getTextElement({
          id,
          content: t,
          parent,
        });
        t = '';
        els.push(text);
      }
    }
  }

  _tokenize(textElement, parent);
  return els;
}

// parse md to ast
export const parse = (md: string) => {  
  return tokenize({ textElement: md });
}