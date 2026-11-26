import {tokenize} from './src/lexer.js';
const input=document.querySelector('#source'),out=document.querySelector('#output');
function run(){try{const tokens=tokenize(input.value);out.textContent=tokens.map(t=>t.line+':'+t.column+'  '+t.kind+'  '+JSON.stringify(t.value)).join('\n');}catch(e){out.textContent=e.message;}}
document.querySelector('#run').addEventListener('click',run);run();
