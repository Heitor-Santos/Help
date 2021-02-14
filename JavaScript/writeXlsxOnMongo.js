import xlsx from 'xlsx'
import mongo from 'mongodb'

/**
 * Transforma uma planilha xlsx em um array de JSON e salva no mongo 
 * @param {caminho da planilha} filePath 
 * @param {nome da planilha dentro do arquivo} sheetName 
 * @param {string de conexão com o mongo} stringMongo 
 * @param {nome do banco de dados mongo} nameMongo 
 * @param {nome da coleção mongo} collectionMongo 
 */
async function writeXlsxMongo(filePath, sheetName, stringMongo, nameMongo, collectionMongo) {
    const { MongoClient } = mongo
    const OPTIONS = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    const client = await new MongoClient(stringMongo, OPTIONS).connect();
    const db = client.db(nameMongo)
    const collection = db.collection(collectionMongo);
    const planilha = xlsx.readFile(filePath)
    const objetos = xlsx.utils.sheet_to_json(planilha.Sheets[sheetName])
    await collection.insertMany(objetos)
    console.log('Concluído!')
}
writeXlsxMongo('exemplo.xlsx', 'nomeplanilha', 'exemplostring', 'exemplodb', 'exemploscollection')
