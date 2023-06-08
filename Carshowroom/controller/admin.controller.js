const { statuscode } = require('../../utils/messages.utils')
const { messaging } = require('../../utils/messaging.utils')
const transaction = require('../schemas/transaction.schema')

const adminAccessData = async (req, res) => {

    const data = await transaction.aggregate([
        {
            $lookup: {
                from: 'cars',
                localField: 'carDetails.carId',
                foreignField: '_id',
                as: 'carData',
                // pipeline: [
                //     {
                //         $lookup: {
                //             from: 'brands',
                //             localField: 'iBrand_id',
                //             foreignField: '_id',
                //             as: 'brandData',
                //             pipeline: [
                //                 {
                //                     $project: {
                //                         _id: 0,
                //                         sBrandName: 1,
                //                     },
                //                 }
                //             ]
                //         },
                        
                //     },
                // ],
            }
        },
        {
            $lookup: {
                from: 'brands',
                localField: 'carData.iBrand_id',
                foreignField: '_id',
                as: 'brandData'
            }
        },
        {
            $facet: {
                TotalCarCount: [
                    {
                        $unwind: '$carData',
                    },
                    {
                        $group: {
                        _id: '$carDetails.carId',
                        count: {
                            $sum: '$carDetails.qty',
                        },
                        sName: {
                            $first: '$carData.sCarName'
                        }
                        },
                    },
                    {
                        $project: {
                        carId: '$_id',
                        _id: 0,
                        count: 1,
                        sName: 1
                        }
                    },
                    {
                        $sort: { count: -1 }
                    },
                    // {
                    //   $limit: 1
                    // }
                    ],
                    TotalBrandCount: [
                    {
                        $unwind: '$brandData'
                    },
                    {
                        $group: {
                        _id: '$brandData._id',
                        count: {
                            $sum: '$carDetails.qty',
                        },
                        sName: {
                            $first: '$brandData.sBrandName'
                        }
                        },
                    },
                    {
                        $project: {
                        brandId: '$_id',
                        _id: 0,
                        count: 1,
                        sName: 1
                        }
                    },
                    {
                        $sort: { count: -1 }
                    },
                    // {
                    //   $limit: 1
                    // }
                    ],
                    CityCount: [
                    {
                        $group: {
                        _id: '$sCity',
                        count: {
                            $sum: '$carDetails.qty',
                        },
                        },
                    },
                    {
                        $project: {
                        sCityName: '$_id',
                        _id: 0,
                        count: 1
                        }
                    },
                    {
                        $sort: { count: -1 }
                    },
                    // {
                    //   $limit: 1
                    // }
                    ],
                }
        }
    ])
    //* populate demo
    // const data = await transaction.findOne({sCity: 'Ahmedabad'})
    //         .populate({ path: 'carDetails.carId', select: ['sCarName', 'nCarModel', 'iBrand_id'],
    //         populate: { path: 'iBrand_id', select: 'sBrandName' }})
    console.log(...data)

    return messaging(res, statuscode.statusSuccess, data[0])
}   

module.exports = {
    adminAccessData
}