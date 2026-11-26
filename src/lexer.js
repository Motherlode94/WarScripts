export function tokenize(source) {
 if(typeof source!=='string') throw new TypeError('Expected source string');
 const tokens=[]; let i=0,line=1,column=1;
 const rules=[['space',/^\s+/],['comment',/^\/\/[^\n]*/],['comment',/^\/\*[\s\S]*?\*\//],['number',/^\d+(?:\.\d+)?/],['string',/^"(?:[^"\\\n]|\\.)*"/],['identifier',/^[A-Za-z_][A-Za-z_0-9]*/],['symbol',/^(?:==|!=|<=|>=|&&|\|\||\+=|-=|[{}()[\];.,:+*/%=!<>-])/]];
 const keywords=new Set(['class','public','private','void','float','int','bool','string','using','if','else','while','return','true','false','new']);
 while(i<source.length){
  const rest=source.slice(i); if(rest.startsWith('/*')&&!rest.includes('*/'))throw new SyntaxError('Unterminated comment at '+line+':'+column);
  const rule=rules.find(([,re])=>re.test(rest));
  if(!rule)throw new SyntaxError('Unexpected character at '+line+':'+column);
  const value=rest.match(rule[1])[0]; let kind=rule[0];
  if(kind==='identifier'&&keywords.has(value))kind='keyword';
  if(kind!=='space'&&kind!=='comment')tokens.push({kind,value,line,column});
  for(const c of value){if(c==='\n'){line++;column=1;}else column++;}
  i+=value.length;
 }
 tokens.push({kind:'eof',value:'',line,column});return tokens;
}
