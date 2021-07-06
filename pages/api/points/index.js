import dbConnect from '../../../utils/dbConnect';
import Points from '../../../models/Points';

dbConnect();

export default async (req, res) => {
    const {method} = req;

    switch(method) {
        case 'GET':
            try {
                const points = await Points.find({});
                res.status(200).json({success: true, data: points})
            } catch (error) {
                res.status(400).json({success: false})
            }    
            break;
        case 'POST':
            try {
                const points = await Points.create(req.body);

                res.status(201).json({success: true, data: points})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false, default: true})
            break;
    }
}