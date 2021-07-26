import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequest(request, response) {
    
    if(request.method === 'POST') {
        const TOKEN = '7bbdf45a88b92abdbe315d869b3f0c';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "1005557", //ID Model do Dato
            ...request.body,
        })
    
        response.json({
            dados: 'Dado qualquer',
            registroCriado: registroCriado,
        })

        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET.'
    }) 
}