import {mkdir, copyFile, readFile, rm} from 'node:fs/promises';
const html = await readFile('index.html', 'utf8');
const css = await readFile('style.css', 'utf8');
const assets = [...new Set((html + css).match(/assets\/[A-Za-z0-9_./-]+/g))];
await rm('dist', {recursive:true, force:true});
await mkdir('dist', {recursive:true});
for (const file of ['index.html','style.css','main.js','.nojekyll',...assets,'assets/fonts/OpenSans-LICENSE.txt']) {
  await mkdir(`dist/${file.split('/').slice(0,-1).join('/')}`, {recursive:true});
  await copyFile(file, `dist/${file}`);
}
console.log(`Built Sid Zhang portfolio with ${assets.length} referenced assets in dist/`);
