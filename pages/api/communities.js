const { SiteClient } = require('datocms-client');

export default async function getRequests(req, res, next) {

    if (req.method === 'POST') {
        const TOKEN = '81780229713a24e927aa2ca0963c5b';
        const client = new SiteClient(TOKEN);

        const record = await client.items.create({
            itemType: '1764730',
            ...req.body,
        });

        console.log(TOKEN);
        res.json({
            "obj": record
        })
        return;
    }

    res.status(404).json({
        message: "Nenhum dado retornado pra GET"
    })

}
