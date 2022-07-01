import * as fs from "fs";
import * as path from "path";

interface Alias {
  name: string;
  path: string;
}

interface ViteAlias {
  find: string;
  replacement: string;
}

interface JestAlias {
  [x: string]: string;
}

const alias: Alias[] = [];
const srcPath = path.join(__dirname, "../src");

fs.readdirSync(srcPath).map((dir) => {
  const dirPath = path.join(srcPath, dir);

  if (fs.lstatSync(dirPath).isDirectory()) {
    alias.push({
      name: dir,
      path: path.join(srcPath, dir),
    });
  }
});

export const viteAlias: ViteAlias[] = alias.map((currentAlias) => ({
  find: currentAlias.name,
  replacement: currentAlias.path,
}));

export const jestAlias: JestAlias = alias.reduce(
  (prev, curr) => {
    const key = `^${curr.name}(.*)$`;
    const value = `${curr.path}/$1`;

    return { ...prev, [key]: value };
  },
  { [`^${alias[0].name}(.*)$`]: `${alias[0].path}/$1` }
);

export default alias;
