#Criamos o projeto Node
npm init
sed -i '/scripts/c\ \"scripts\" : \ {\n    "build": "tsc",\n    "start": "npm run build && node dist/index.js",\n    "dev": "ts-node-dev 'src/index.ts'\",' package.json
#Depois adicionamos configurações TypeScript
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cp $SCRIPTPATH/init-ts-node-files/tsconfig.json tsconfig.json
#Depois adicionamos dependências
npm install express
npm install body-parser
npm install mongodb
npm install cors
npm install dotenv
npm install --save-dev @types/express
npm install --save-dev @types/node
npm install --save-dev @types/cors
npm install --save-dev @types/mongodb
npm install --save-dev @types/dotenv
#Depois criamos a hierarquia de diretórios
mkdir src
mkdir src/routes
#Depois copiamos os arquivos necessários
cp $SCRIPTPATH/init-ts-node-files/.gitignore .gitignore
cp $SCRIPTPATH/init-ts-node-files/.env .env
cp $SCRIPTPATH/init-ts-node-files/index.ts src/index.ts
cp $SCRIPTPATH/init-ts-node-files/routes.ts src/routes/routes.ts

