export default async function validate(req, res){
    const {method} = req;

    switch(method) {
        case 'GET':
            res.status(400).json({success: false, default: true})
            break;
        case 'POST':
            try {
                console.log(req.body, 'what i get here?')
                // const points = await Points.create(req.body);

                // res.status(201).json({success: true, data: points})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false, default: true})
            break;
    }
}