const errorHandler = require('../utils/errorHandler')
const Order = require('../models/Order')
const moment = require('moment')




module.exports.overview = async function ( req, res ) {
  try {
    const allOrders = await Order
      .find({ user: req.user.id})
      .sort({date: 1})
    const ordersMap = getOrdersMap( allOrders )     
    
    const yesterdayOrders = ordersMap[ moment().add(-1, 'd').format( 'DD.MM.YYYY')] || []
    
    // КОЛИЧЕСТВО ЗАКАЗОВ ВЧЕРА
    const yerstadayOrdersNumber = yesterdayOrders.length
    
    // количество заказов 
    const totalOrdersNumber = allOrders.length
    
    // кол-во дней всего
    const daysNumber = Object.keys( ordersMap ).length
    
    // среднее заказов в день
    const ordersPerDay = ( totalOrdersNumber / daysNumber ).toFixed( 0 )
    
    // процент кол-ва закзов
    const ordersPercent = (((yerstadayOrdersNumber/ordersPerDay)-1)*100).toFixed( 2 ) 
    
    // вся выручка
    const totalGain = calculatePrice ( allOrders )
    
    //  средняя выручка в день
    const gainPerDay = totalGain / daysNumber
    
    // выручка за вчера
    const yerstadayGain = calculatePrice( yesterdayOrders )
    
    // процент выручки
    const gainPercent =  ((( yerstadayGain / gainPerDay )-1)*100).toFixed( 2 ) 
    
    // сравнение выручки
    const compareGain = ( yerstadayGain - gainPerDay).toFixed( 2 )
    
    // сравнение кол-ва закзов
    const compareNumber = ( yerstadayOrdersNumber - ordersPerDay )
    const payload = {
      gain: {
        percent: Math.abs( + gainPercent),
        compare: Math.abs( + compareGain ),
        yesterday: + yerstadayGain,
        isHigher: + gainPercent>0
      },
      orders: {
        percent: Math.abs( + ordersPercent),
        compare: Math.abs( + compareNumber ),
        yesterday: + yerstadayOrdersNumber,
        isHigher: + ordersPercent>0
      }
    }     
    
    res.status(200).json( payload )
  } catch (error) {
    errorHandler( res, error)
  }
}
module.exports.analitics = async function ( req, res ) {
    try {
      console.log( 'req_anal__________')
      const allOrders = await Order.find({ user: req.user.id}).sort({date: 1})
      const ordersMap = getOrdersMap( allOrders )

      const average = + (calculatePrice( allOrders ) / Object.keys( ordersMap ).length).toFixed( 2 )

      const chart = Object.keys( ordersMap ).map ( label => {
        const order = ordersMap[ label ].length
        const gain = calculatePrice( ordersMap[ label ])

        return { label, order, gain }
      })
      console.log("res_analit____", {
        average,
        chart
      })
      res.status( 200 ).json({
        average,
        chart
      })
    } catch (error) {
      errorHandler( res, error)
    }
}

function getOrdersMap( orders = []) {
  const daysOrders = {}
  orders.forEach( order => {
    const date = moment( order.date ).format('DD.MM.YYYY')
    if ( date === moment().format('DD.MM.YYYY')) {
      return
    }
    if ( !daysOrders[ date ]) { 
      daysOrders[ date ] = []
    }
    daysOrders[ date ].push( order )
  })
  return daysOrders
}

function calculatePrice( orders = [] ) {

  return orders.reduce((total, order ) => {
    const orderPrice = order.list.reduce (( orderTotal, item ) => {
      return orderTotal += item.cost * item.quantity
    }, 0 )
    return total += orderPrice
  }, 0)

}