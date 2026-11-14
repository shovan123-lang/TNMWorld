// Loads the site's data files and prints contracts + world date as JSON (used by build.py)
const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..','..');
global.P={};global.E=[];global.ARTICLES={};global.CONTRACTS={};global.FINANCE={};global.SITES={};global.BANNER_SVG={};
let src='';for(const f of ['world','wcw','wwf','uswa','pp','ajpw','njpw','cmll','asw','twa','fmw'])src+=fs.readFileSync(path.join(root,'data',f+'.js'),'utf8')+'\n';
src+='\nglobal.__WD=WORLD_DATE;';eval(src);
process.stdout.write(JSON.stringify({world:global.__WD,contracts:CONTRACTS}));
