const errorHandler = require('../utils/errorHandler')
const Order = require('../models/Order')
const moment = require('moment')




module.exports.overview = async function ( req, res ) {
  try {
    const allOrders = await Order
      .find({ user: req.user.id})
      .sort(1)
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

    res.status(200).json({
      gain: {
        percent: Math.abs( + gainPercent),
        compare: Math.abs( + compareGain ),
        yessterday: + yerstadayGain,
        isHigher: + gainPercent
      },
      gain: {
        percent: Math.abs( + ordersPercent),
        compare: Math.abs( + compareNumber ),
        yessterday: + yerstadayOrdersNumber,
        isHigher: + ordersPercent
      }
    })


  } catch (error) {
    errorHandler( res, error)
  }

  const ordersMap = getOrdersMap( allOrders )

}
module.exports.analitics = function ( req, res ) {
    
}

function getOrdersMap( orders = []) {
  const daysOrders = {}
  orders.forEach( order => {
    const date = moment( order.date ).format('DD.MM.YYYY')

    if ( date === moment().format('DD.MM.YYYY')) {
      return
    }
    if ( !daysOrders[ date ]) { 
      daysOrders[ date ] 
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