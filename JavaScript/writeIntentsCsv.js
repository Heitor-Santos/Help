import fs from 'fs';

/**
 * Adiciona uma linha em um determinado arquivo .csv
 * @param {caminho do arquivo que será editado} filePath 
 * @param {lista com valores dos campos a serem adicionados} row 
 */
function writeSheet(filePath, row) {
    const sheet = fs.readFileSync(filePath).toString();
    fs.writeFileSync(filePath, sheet + "\n" + `${row.join(',')}`)
}

/**
 * Adiciona header (linha inicial) em um determinado arquivo .csv
 * @param {caminho do arquivo que será editado} filePath 
 * @param {lista com valores dos campos a serem adicionados} headers 
 */
function writeHeadSheet(filePath, headers) {
    fs.writeFileSync(filePath, headers.join(','))
}

/**
 * Retorna lista de respostas de uma intent; uma resposta pode ser uma string ou um objeto
 * @param {objeto JSON da intent} intent 
 */
function getResponses(intent) {
    let responses = []
    let formatMsg
    intent["responses"].map((resp => {
        resp["messages"].map(msg => {
            formatMsg = msg["speech"] ? msg["speech"] : msg["payload"]
            responses.push(formatMsg)
        })
    }))
    return formatMsg
}

/**
 * Retorna uma lista de termos que o usuário pode entrar para invocar essa intent
 * @param {caminho do arquivo da intent} intentPath 
 */
function getTermos(intentPath) {
    const userSaysPath = intentPath.split('.json')[0] + "_usersays_pt-br.json";
    if (!fs.existsSync(userSaysPath)) return []
    const userSays = JSON.parse(fs.readFileSync(userSaysPath))
    let termos = []
    let text
    userSays.map(say => {
        text = ""
        say["data"].map(data => {
            text += data["text"]
        })
        termos.push(text)
    })
    return termos
}

/**
 * Retorna o nome, termos, se está ativada ou não, e resposta da intent 
 * @param {caminho do arquivo da intent} intentPath 
 */
function getIntentInfo(intentPath) {
    const intent = JSON.parse(fs.readFileSync(intentPath));
    const name = intent["name"];
    const termos = getTermos(intentPath);
    const responses = getResponses(intent);
    const ativada = intent["priority"] === -1 ? "Desativada" : "Ativada";
    return { name, termos, responses, ativada }
}
/**
 * Formata uma lista com demarcadores de quebra de linha, vírgulas e aspas para serem colocados em um campo .csv
 * @param {lista de objetos/strings para serem adicionados em um campo .csv} lista 
 */
function formatMultiLine(lista) {
    let stringLista = []
    let isObj = false;
    for (let i in lista) {
        if (typeof lista[i] != "string") {
            isObj = true;
            stringLista.push(JSON.stringify(lista[i]))
        }
        else stringLista.push(lista[i])
    }
    if (isObj) {
        lista = stringLista
    }
    for (let i in lista) {
        lista[i] = lista[i].replace(/"/gi, '""')
    }
    if (!lista || !lista.length) return ''
    if (lista.length > 1 || lista[0].includes('\n') || lista[0].includes(',')) {
        return `"${lista.join('\n')}"`
    }
    return `${lista.join('\n')}`
}

/**
 * Retorna termos, respostas e demais campos da intent, já formatados, prontos para serem colocados no .csv
 * @param {nome, lista de termos, lista de respostas, e booleano de ativação da intent} param0 
 */
function formatInfoIntent({ name, termos, responses, ativada }) {
    termos = formatMultiLine(termos)
    responses = formatMultiLine(responses)
    return { name, termos, responses, ativada }
}

/**
 * Função principal que pega todas as informações e escreve na planilha
 * @param {caminho da planilha} filePath 
 * @param {caminho da pasta de intents} intentsPath 
 */
function getAllIntentsInfo(filePath, intentsPath) {
    writeHeadSheet(filePath, ['Nome Intenção', 'Termos Treinados', 'Resposta[BOT]', 'Ativada'])
    const intents = fs.readdirSync(intentsPath);
    let intentInfo
    let intentInfoFormat
    for (let intent of intents) {
        if (!intent.endsWith('_usersays_pt-br.json')) {
            intentInfo = getIntentInfo(intentsPath + "/" + intent)
            intentInfoFormat = formatInfoIntent(intentInfo)
            writeSheet(filePath, intentInfoFormat)
        }
    }
}
getAllIntentsInfo("exemplo.csv", "intents")