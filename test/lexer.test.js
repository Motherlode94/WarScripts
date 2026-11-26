import test from 'node:test';import assert from 'node:assert/strict';import {tokenize} from '../src/lexer.js';
test('class and literals',()=>assert.deepEqual(tokenize('public class Player { float speed = 5.0; }').map(t=>t.value),['public','class','Player','{','float','speed','=','5.0',';','}','']));
test('locations and comments',()=>assert.deepEqual(tokenize('// hello\n  x')[0],{kind:'identifier',value:'x',line:2,column:3}));
test('invalid source',()=>{assert.throws(()=>tokenize('@'),SyntaxError);assert.throws(()=>tokenize('/* bad'),SyntaxError);});
