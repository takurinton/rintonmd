export type Token = {
  id: number;         // identify
  parent: Token;      // parent token for nest
  elementType: string; // HTMLElement Type (e.g. div, p, a, and more...
  content: string;    // content
}

// merged token
export type MergedToken = {
  id: number;
  parent: Token | MergedToken;
  elementType: 'merged';
  content: string;
}