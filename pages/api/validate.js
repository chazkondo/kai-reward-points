import dbConnect from '../../utils/dbConnect';
import Connections from '../../models/Connections';

dbConnect();

export default async function validate(req, res){
    const {method} = req;

    switch(method) {
        case 'GET':
            res.status(400).json({success: false})
            break;
        case 'POST':
            try {
                const forwarded = req.headers['x-forwarded-for'];
                const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
                const existingRecord = await Connections.find({connection: ip})
                if (existingRecord.length) {
                    if (existingRecord[0].attempt >= 4) {
                        return res.status(200).json({success: false, blacklist: true})
                    }
                    if (req.body.password === process.env.PASSWORD || req.body.password === process.env.PASSWORD1 || req.body.password === process.env.PASSWORD2) {
                        await Connections.findByIdAndUpdate(existingRecord[0]._id, {attempt: existingRecord[0].attempt, date: Date.now()}, {
                            new: true,
                            runValidators: true
                        })
                        res.status(200).json({success: true})
                    } else {
                        await Connections.findByIdAndUpdate(existingRecord[0]._id, {attempt: existingRecord[0].attempt+1, date: Date.now()}, {
                            new: true,
                            runValidators: true
                        })
                        res.status(200).json({success: false})
                    }
                } else {
                    if (req.body.password === process.env.PASSWORD || req.body.password === process.env.PASSWORD1 || req.body.password === process.env.PASSWORD2) {
                        await Connections.create({connection: ip, attempt: 0, date: Date.now()});
                        res.status(200).json({success: true})
                    } else {
                        await Connections.create({connection: ip, attempt: 1, date: Date.now()});
                        res.status(200).json({success: false, connections})
                    }
                }
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}