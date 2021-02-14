# Help
Esse repositório serve para colocar códigos ou trechos de código que me são úteis no cotidiano.
## JavaScript
------------
**writeIntentsCsv**: script para gerar planilha csv com informações sobre as intents de um bot do
DialogFlow, gera os campos 'Nome Intenção', 'Termos Treinados', 'Resposta[BOT]' e 'Ativada'.

**writeXlsxOnMongo**: script para popular uma coleção mongo a partir de uma planilha xlsx. 
## Bash
------------
**init-ts-node**: script para gerar projeto backend node e typescript no padrão que eu costumo usar.
Instala também o express, body-parser, mongodb, cors e dotenv. Gera o arquivo index.ts e um arquivo de rotas.
Para instalá-lo, entre na pasta correspondente e execute os passos a seguir:

     chmod +x install.sh
     ./install.sh
Agora é só digitar `init-ts` na pasta que você quiser iniciar o seu projeto