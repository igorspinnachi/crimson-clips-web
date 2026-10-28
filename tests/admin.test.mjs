import test from 'node:test';
import assert from 'node:assert/strict';
import { mockSubmissions } from '../lib/mock-admin-data.ts';
import { filterSubmissions, countBy, activitySeries, validCompilationUrl } from '../lib/admin-selectors.ts';
const defaults={search:'',game:'',category:'',status:'',sort:'newest'};
test('all mock IDs are unique and status counts reconcile',()=>{
 assert.equal(new Set(mockSubmissions.map(s=>s.id)).size,24);
 assert.equal(Object.values(countBy(mockSubmissions,'status')).reduce((a,b)=>a+b,0),24);
 assert.equal(Object.keys(countBy(mockSubmissions,'status')).length,5);
});
test('search is case-insensitive and matches creator, ID, email and description',()=>{
 for(const search of ['neondrifter','cc-1048','NEONDRIFTER@EXAMPLE.COM','perfectly planned']) assert.ok(filterSubmissions(mockSubmissions,{...defaults,search}).some(s=>s.id==='CC-1048'));
 assert.equal(filterSubmissions(mockSubmissions,{...defaults,search:'NO_MATCH_123'}).length,0);
});
test('filters combine and sorting never mutates source data',()=>{
 const before=mockSubmissions.map(s=>s.id);
 const result=filterSubmissions(mockSubmissions,{...defaults,game:'GTA VI',category:'Funny',status:'Pending'});
 assert.ok(result.length>0);
 assert.ok(result.every(s=>s.game==='GTA VI'&&s.category==='Funny'&&s.status==='Pending'));
 const old=filterSubmissions(mockSubmissions,{...defaults,sort:'oldest'});
 assert.ok(old[0].submittedAt<=old.at(-1).submittedAt);
 const alpha=filterSubmissions(mockSubmissions,{...defaults,sort:'creator'});
 assert.deepEqual(alpha.map(s=>s.creator),[...alpha.map(s=>s.creator)].sort((a,b)=>a.localeCompare(b)));
 assert.deepEqual(mockSubmissions.map(s=>s.id),before);
});
test('date series includes empty dates and totals match submissions',()=>{
 const series=activitySeries(mockSubmissions);
 assert.equal(series.length,14);
 assert.equal(series[0].count,0);
 assert.equal(series.reduce((sum,s)=>sum+s.count,0),mockSubmissions.length);
});
test('derived counts reflect a changed status without changing seed data',()=>{
 const changed=mockSubmissions.map((s,i)=>i===0?{...s,status:'Published'}:s);
 assert.equal(countBy(changed,'status').Published,countBy(mockSubmissions,'status').Published+1);
 assert.equal(countBy(changed,'status').Pending,countBy(mockSubmissions,'status').Pending-1);
 assert.equal(mockSubmissions[0].status,'Pending');
});
test('compilation placeholder accepts only HTTPS YouTube hosts',()=>{
 for(const url of ['', 'https://www.youtube.com/watch?v=demo','https://youtu.be/demo']) assert.equal(validCompilationUrl(url),true);
 for(const url of ['javascript:alert(1)','http://youtube.com/watch','https://youtube.com.evil.example/video','not a URL']) assert.equal(validCompilationUrl(url),false);
});
