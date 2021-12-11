import { parse } from "./parser";
import { generate } from './generator';

// core package
const rintonmd = (md: string) => {
  const mdList = md.split(/\r\n|\r|\n/);
  const astList = mdList.map(md => parse(md));
  const htmlList = generate(astList).join('');
  return htmlList;
}

export default rintonmd;