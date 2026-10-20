import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initializeSiteSearch} from '../src/scripts/siteSearch.js';

test('search announces load failures, retries a new request, and restores background access', async t=>{
 class Element extends EventTarget {
  dataset:any={};hidden=false;inert=false;tagName='DIV';isConnected=true;value='';textContent='';innerHTML='';scrollTop=0;style:any={overflow:''};targets:any={};retry=false;
  querySelector(s:string){return this.targets[s]||null;}querySelectorAll(){return [];}
  contains(el:any){return el===this;}focus(){}select(){}
  closest(s:string){return s==='[data-search-retry]'&&this.retry?this:null;}
  insertAdjacentHTML(_:string,html:string){this.innerHTML+=html;}
 }
 const modal=new Element();modal.hidden=true;modal.dataset={lang:'en',indexUrl:'/search-index.json',labels:JSON.stringify({loadFailure:'Search could not load',retryDescription:'Check your connection',retry:'Try again',emptyTitle:'Start with a keyword',emptyDescription:'Search everything',loading:'Loading',showing:'Showing',of:'of',resultCount:'results',resultSingle:'result'})};
 const input=new Element(),results=new Element(),status=new Element(),footer=new Element(),more=new Element(),open=new Element(),background=new Element(),alreadyInert=new Element();alreadyInert.inert=true;
 modal.targets={'[data-search-input]':input,'[data-search-results]':results,'[data-search-status]':status,'[data-search-footer]':footer,'[data-search-more]':more};
 const document=Object.assign(new EventTarget(),{querySelector:(s:string)=>s==='[data-search-modal]'?modal:null,querySelectorAll:()=>[open],body:{style:{overflow:''},children:[background,alreadyInert,modal]},activeElement:null,getElementById:()=>null});
 const window=Object.assign(new EventTarget(),{location:{hash:''},requestAnimationFrame:(fn:Function)=>fn(),queueMicrotask});
 let requests=0;
 const replacements={document,window,Element,fetch:async()=>{requests++;if(requests===1)throw Error('offline');return {ok:true,json:async()=>[{language:'en',type:'dashboard',title:'Fund research',description:'Fund overview',url:'/projects/fund/',tags:[],searchContent:'fund research'}]};}};
 for(const [key,value]of Object.entries(replacements)){const previous=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});t.after(()=>previous?Object.defineProperty(globalThis,key,previous):Reflect.deleteProperty(globalThis,key));}
 const settle=()=>new Promise(resolve=>setImmediate(resolve));
 initializeSiteSearch();open.dispatchEvent(new Event('click'));await settle();
 assert.equal(status.textContent,'Search could not load');assert.match(results.innerHTML,/data-search-retry/);assert.equal(background.inert,true);
 input.value='fund';const retry=new Element();retry.retry=true;const click=new Event('click');Object.defineProperty(click,'target',{value:retry});results.dispatchEvent(click);await settle();
 assert.equal(requests,2);assert.match(results.innerHTML,/Fund research/);assert.equal(status.textContent,'1 result');
 document.dispatchEvent(new Event('astro:before-swap'));assert.equal(background.inert,false);assert.equal(alreadyInert.inert,true);assert.equal(document.body.style.overflow,'');
});
