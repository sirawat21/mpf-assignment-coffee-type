# Coffee Type Assignment

## Description
Demostrating REST API assignment from by MPF
Dependency
```
npm install typescript ts-node@10.9.1 express nodemon
npm install --save @types/express
```
Compile & Execute
```
tsc [file]
tsc --project tsconfig.json

npx ts-node [file]
```
Build
```
npm run build
```
Run project with monitoring
```
npm start
```
## Configuration
Generating initial file
```
tsc --init
```
Simple Templates 
```
{
  "compilerOptions": {
    "target": "es2017",
    "module": "node16",
    "moduleResolution": "node",
    "rootDir": "src",
    "outDir": "dist",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "allowJs": true,
    "checkJs": false,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
## References
- Typescript [sorce](https://www.typescriptlang.org/)
- Typescript CLI [sorce](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options)
- Typescript on NPM [sorce](https://www.npmjs.com/package/typescript)
- TS ExpressJS [sorce](https://www.npmjs.com/package/@types/express)