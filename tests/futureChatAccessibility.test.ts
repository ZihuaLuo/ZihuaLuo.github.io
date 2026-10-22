import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createTaskScope} from '../src/scripts/taskScope.ts';

test('chat batches accessible replies, keeps focus, and respects history scrolling',async t=>{
 const source=readFileSync(new URL('../src/components/ai/FutureChat.astro',import.meta.url),'utf8').split('<script>')[1].split('</script>')[0].replace(/^\s*import .*;$/gm,'');
 const script=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
 let document:any;
 class Element extends EventTarget{
  dataset:any={};attributes=new Map<string,string>();children:Element[]=[];hidden=false;disabled=false;readOnly=false;isConnected=true;value='';textContent='';className='';clientHeight=100;scrollTop=0;targets:any={};
  classList={add:(..._:string[])=>{},remove:(..._:string[])=>{}};
  get scrollHeight(){return 80+this.children.length*120;}
  setAttribute(k:string,v:string){this.attributes.set(k,v);}getAttribute(k:string){return this.attributes.get(k)??null;}removeAttribute(k:string){this.attributes.delete(k);}
  append(...els:Element[]){this.children.push(...els);for(const el of els)(el as any).parent=this;}
  remove(){const p=(this as any).parent;if(p)p.children=p.children.filter((c:Element)=>c!==this);}
  querySelector(s:string){return this.targets[s]??null;}querySelectorAll(s:string){return this.targets[s]??[];}
  focus(){document.activeElement=this;}requestSubmit(){this.dispatchEvent(new Event('submit',{cancelable:true}));}
 }
 const chat=new Element(),transcript=new Element(),form=new Element(),input=new Element(),send=new Element(),prompt=new Element(),elsewhere=new Element(),status=new Element();
 form.targets={'button[type="submit"]':send};
 chat.targets={'[data-chat-transcript]':transcript,'[data-chat-form]':form,'[data-chat-input]':input,'[data-chat-prompt]':[prompt],'[data-chat-status]':status,'[data-chat-robot-template]':{content:{cloneNode:()=>new Element()}}};
 const timers=new Map<number,Function>(),frames=new Map<number,Function>();let id=0;
 document=Object.assign(new EventTarget(),{readyState:'complete',activeElement:null,querySelectorAll:()=>[chat],createElement:()=>new Element()});
 const window=Object.assign(new EventTarget(),{location:{search:''},matchMedia:()=>({matches:false}),setTimeout:(fn:Function)=>{timers.set(++id,fn);return id;},clearTimeout:(n:number)=>timers.delete(n),requestAnimationFrame:(fn:Function)=>{frames.set(++id,fn);return id;},cancelAnimationFrame:(n:number)=>frames.delete(n)});
 const previous=Object.getOwnPropertyDescriptor(globalThis,'window');Object.defineProperty(globalThis,'window',{value:window,configurable:true});t.after(()=>previous?Object.defineProperty(globalThis,'window',previous):Reflect.deleteProperty(globalThis,'window'));
 vm.runInNewContext(script,{document,window,createTaskScope,URLSearchParams,sessionStorage:{getItem:()=> 'true',setItem(){}},IntersectionObserver:class{observe(){}unobserve(){}disconnect(){}},profileTopics:[],getProfileAnswer:()=>({topicId:'resume',text:'Full accessible answer',link:{href:'/#contact',label:'Connect'}}),withBase:(p:string)=>p});
 const flushTimers=()=>{const list=[...timers.values()];timers.clear();list.forEach(fn=>fn());};
 const frame=(time:number)=>{const list=[...frames.values()];frames.clear();list.forEach(fn=>fn(time));};
 const settle=()=>new Promise(resolve=>setImmediate(resolve));
 input.value='resume';input.focus();form.requestSubmit();
 assert.equal(status.textContent,'APOCALYPSE is preparing a reply.');
 assert.equal(input.disabled,false);assert.equal(input.readOnly,true);assert.equal(transcript.getAttribute('aria-busy'),'true');assert.equal(send.getAttribute('aria-disabled'),'true');
 assert.equal(document.activeElement,input);
 const before=transcript.children.length;form.requestSubmit();assert.equal(transcript.children.length,before,'pending requests cannot duplicate messages');
 elsewhere.focus();flushTimers();frame(0);
 transcript.scrollTop=0;transcript.dispatchEvent(new Event('scroll'));frame(2100);await settle();
 assert.equal(transcript.scrollTop,0,'manual history position is not forced back to the latest reply');
 assert.equal(document.activeElement,elsewhere,'reply completion must not steal focus');assert.equal(input.readOnly,false);assert.equal(status.textContent,'');assert.equal(transcript.getAttribute('aria-busy'),null);assert.equal(send.getAttribute('aria-disabled'),null);
 const answer=transcript.children.at(-1)!;assert.equal(answer.children[0].children[0].textContent,'AI');const paragraph=answer.children[1];assert.equal(paragraph.children.filter(el=>el.className==='sr-only')[0].textContent,'Full accessible answer');assert.equal(paragraph.children.at(-1)?.hidden,false);
 document.dispatchEvent(new Event('astro:before-swap'));assert.equal(frames.size,0);assert.equal(timers.size,0);
});
