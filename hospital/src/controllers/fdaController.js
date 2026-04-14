import axios from 'axios';
import * as deepl from 'deepl-node';



const tradutor= new deepl.Translator(process.env.DEEPL_AUTH_KEY);

const buscarETraduzir= async(nomeMedicamento) =>{
    try {
        
        const fdaUrl=`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${nomeMedicamento}"&limit=1`
        const {data}= await axios.get(fdaUrl);

        const result= data.results[0];

        const textoTraduzir= [
            result.indication_and_usage?.[0] || 'inidicacoes nao disponiveis',
            result.adverse_reaction?.[0] || 'reacoes nao disponiveis'
        ];

        const traducoes = await tradutor.translateText(textoTraduzir, null, 'pt-BR');

        return{
            indicacoes: traducoes[0].text,
            reacoes: traducoes[1].text
        };

    } catch (error) {
        console.error("Erro na integração FDA/DeepL:", error.message);
        return null;
    }
};

export default buscarETraduzir;