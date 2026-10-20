import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {addProjectMetadata} from '../src/utils/projectMetadata.ts';
const require=createRequire(import.meta.url);
const braces=require('braces');

test('braces rejects excessive string and AST depth before recursive stack exhaustion',()=>{
 const deeplyNested='{'.repeat(4000)+'a,b'+'}'.repeat(4000);
 for(const method of ['parse','compile','expand','stringify']) assert.throws(()=>braces[method](deeplyNested),{name:'SyntaxError',message:/nesting/});
 const ast=braces.parse('{a,b}');let node=ast;
 for(let i=0;i<10000;i++){const child={type:'brace',nodes:[],parent:node};node.nodes=[child];node=child;}
 for(const method of ['compile','expand','stringify']) assert.throws(()=>braces[method](ast),{name:'SyntaxError',message:/nesting/});
});
test('braces keeps normal file patterns, ranges, escaped braces and nesting unchanged',()=>{
 assert.deepEqual(braces.expand('./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'),['astro','html','js','jsx','md','mdx','svelte','ts','tsx','vue'].map(ext=>'./src/**/*.'+ext));
 assert.deepEqual(braces.expand('a/{b,{c,d}}/{1..3}'),['a/b/1','a/b/2','a/b/3','a/c/1','a/c/2','a/c/3','a/d/1','a/d/2','a/d/3']);
 assert.equal(braces.compile('a/\\{literal\\}/{b,c}'),'a/{literal}/(b|c)');
});
test('project metadata only changes the head and excludes private projects',()=>{
 const body='<body><script>const data="<head>unchanged</head>";</script><canvas></canvas></body>';
 const html='<html><head><title>Keep title</title><meta content="old" name="description"><link href="old" rel="canonical"></head>'+body+'</html>';
 const result=addProjectMetadata(html,'cloudline','https://example.com/a?b=1&c="2"');
 assert.ok(result.endsWith(body+'</html>'));assert.ok(result.includes('<title>Keep title</title>'));
 assert.equal((result.match(/rel="canonical"/g)||[]).length,1);
 assert.ok(result.includes('b=1&amp;c=&quot;2&quot;'));assert.ok(!result.includes('content="old"'));
 assert.throws(()=>addProjectMetadata(html,'retention-lab','https://example.com/private'));
});

test('credits filter survives repeated Astro departures and returns with new DOM',()=>{
 const script=readFileSync(new URL('../src/components/CreditSection.astro',import.meta.url),'utf8').split('<script is:inline define:vars={{ copy }}>')[1].split('</script>')[0];
 const classList=()=>({toggle(){}});
 function page(){
  const cards=['john maheu','someone else'].map(name=>({dataset:{creditSearchText:name},hidden:false}));
  const search=Object.assign(new EventTarget(),{value:''});const total={textContent:''};
  const list={dataset:{creditTier:'huge'},querySelectorAll:()=>cards};
  const panel={dataset:{creditTierPanel:'huge'},classList:classList()};const label={dataset:{creditShowing:'huge'},textContent:''};
  const section={dataset:{},querySelector:s=>({'[data-credit-search]':search,'[data-credit-total]':total,'[data-credit-empty]':{classList:classList()}}[s]),querySelectorAll:s=>({'[data-credit-list]':[list],'[data-credit-tier-panel]':[panel],'[data-credit-showing]':[label]}[s]||[])};
  return {section,search,total,cards};
 }
 let current=page();const frames:Function[]=[];
 const document=Object.assign(new EventTarget(),{readyState:'complete',querySelectorAll:()=>current?[current.section]:[],getElementById:()=>null});
 const window=Object.assign(new EventTarget(),{location:{search:'',hash:''},matchMedia:()=>({matches:false}),requestAnimationFrame:(fn:Function)=>frames.push(fn)});
 vm.runInNewContext(script,{document,window,AbortController,URLSearchParams,copy:{showing:'Showing',of:'of'}});
 for(let visit=0;visit<3;visit++){
  if(visit){current=page();document.dispatchEvent(new Event('astro:page-load'));}
  assert.equal(current.total.textContent,'2');
  current.search.value='John Maheu';current.search.dispatchEvent(new Event('input'));frames.splice(0).forEach(fn=>fn());
  assert.equal(current.total.textContent,'1');assert.equal(current.cards.filter(card=>card.hidden).length,1);
  document.dispatchEvent(new Event('astro:before-swap'));
 }
});
