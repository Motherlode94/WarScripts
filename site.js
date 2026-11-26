import {tokenize} from './src/lexer.js';
const $=id=>document.getElementById(id);
const examples={player:'public class Player {\n    float speed = 5.0;\n    void Start() { Log("Ready"); }\n}',conditions:'int health = 100;\nif (health <= 0) { return; } else { health -= 5; }',loop:'int i = 0;\nwhile (i < 10) { i += 1; }',strings:'// Message\nstring name = "WarLike";\n/* note */ bool ready = true;',error:'float speed = @;'};let tokens=[];
function render(){const f=$('filter').value;const rows=tokens.filter(t=>f==='all'||t.kind===f).slice(0,2000);$('tokens').replaceChildren(...rows.map(t=>{const tr=document.createElement('tr');for(const v of [t.line+':'+t.column,t.kind,JSON.stringify(t.value)]){const td=document.createElement('td');td.textContent=v;tr.append(td);}return tr;}));$('counts').textContent=tokens.length+' tokens · '+rows.length+' affichés · '+$('source').value.length+' caractères';}
function run(){try{tokens=tokenize($('source').value);$('output').textContent=JSON.stringify(tokens.slice(0,100),null,2);render();}catch(e){tokens=[];render();$('output').textContent=e.message;}}
function reset(){$('source').value=examples[$('example').value];run();}
$('example').onchange=reset;$('run').onclick=run;$('reset').onclick=reset;$('filter').onchange=render;
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(tokens,null,2));$('counts').textContent='JSON copié';}catch{$('counts').textContent='Copie indisponible ; utilise Exporter.';}};
$('download').onclick=()=>{const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(tokens,null,2)],{type:'application/json'}));a.href=url;a.download='warscripts-tokens.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};reset();
