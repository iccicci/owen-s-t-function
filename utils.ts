// eslint-disable-next-line @typescript-eslint/no-var-requires
const { unlink, writeFile } = require("fs");

const common: string[] = [".gitignore", ".npmignore", ".nyc_output", "*.tgz", "coverage", "node_modules", "owen-s-t-function/node_modules", ""];
const git: string[] = ["src/owen-s-t-function.d.ts", "src/owen-s-t-function.js"];
const npm: string[] = [".*", "public", "src/App*", "src/index*", "src/react*", "src/owen-s-t-function.ts", "src/service*", "test", "tsconfig.json", "tslint.json", "utils.ts"];

if(process.argv[2] === "clean") unlink("src/owen-s-t-function.js", (): void => unlink("src/owen-s-t-function.d.ts", (): void => {}));
if(process.argv[2] === "ignore") writeFile(".gitignore", git.concat(common).join("\n"), (): void => writeFile(".npmignore", npm.concat(common).join("\n"), (): void => {}));
