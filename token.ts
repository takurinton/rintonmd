export type Token = {
  id: number;         // identify
  parent: Token;      // parent token for nest
  elementType: string; // HTMLElement Type (e.g. div, p, a, and more...
  content: string;    // content
}