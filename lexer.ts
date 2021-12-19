import type { Token } from './token';

const H1 = 'h1';
const H2 = 'h2';
const H3 = 'h3';
const H4 = 'h4';
const H5 = 'h5';
const P = 'p';
const A = 'a';
const TEXT = 'text';
const STRONG = 'strong';
const LI = 'li';
const UL = 'ul';

export const getTextElement = ({
  id,
  content,
  parent,
}: {
  id: number;
  content: string;
  parent: Token;
}): Token => ({
  id,
  parent,
  elementType: TEXT,
  content,
});

export const getStrongElement = ({
  id,
  content,
  parent,
}: {
  id: number;
  content: string;
  parent: Token;
}): Token => ({
  id,
  parent,
  elementType: STRONG,
  content,
});

export const getH1Element = ({
  id,
  content,
  parent,
}: {
  id: number;
  content: string;
  parent: Token;
}): Token => ({
  id,
  parent,
  elementType: H1,
  content,
});

export const getLiElement = ({
  id,
  content,
  parent,
}: {
  id: number;
  content: string;
  parent: Token;
}): Token => ({
  id,
  parent,
  elementType: LI,
  content,
});

export const getUlElement = ({
  id,
  content,
  parent,
}: {
  id: number;
  content: string;
  parent: Token;
}): Token => ({
  id,
  parent,
  elementType: UL,
  content,
});

