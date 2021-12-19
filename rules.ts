export const matchStrong = (text: string) => {
  return text.match(/\*\*(.*?)\*\*/);
}
  
export const matchH1 = (text: string) => {
  return text.match(/# (.*?)/);
}

export const matchLi = (text: string) => {
  return text.match(/^( *)([-|\*|\+] (.+))$/m);
}
