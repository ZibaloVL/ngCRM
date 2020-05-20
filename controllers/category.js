const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function ( req, res ) {
  try {
    const categories = await Category.find({
      user: req.user.id
    })
    res.status(200).json({ categories })    
  } catch (error) {
    errorHandler( error, res )
  }
}

module.exports.getById = async function ( req, res ) {
  try {
    const category = await Category.findById( req.params.id)
    res.status(200).json( category )
  } catch (error) {
    errorHandler( error, res )
  } 
}

module.exports.remove = async function ( req, res ) {
  try {
    await Category.remove({ _id: req.params.id})
    await Position.remove({category: req.params.id})
    res.status(200).json({
      message: "Категория удалена"
    })
  } catch (error) {
    errorHandler( error, res )
  } 
}
//  НЕ ПРОПИСЫВАЕТСЯ ФАЙЛ В REQ.FILE?????
module.exports.create = async function ( req, res ) {
  console.log('enter_______________________')
  console.log('req.file_______', req.file )
  const category = new Category ({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  })  
  try {
    await category.save()
    res.status(201).json( category )
  } catch (error) {
    errorHandler( error, res )
  } 
}

module.exports.update = async function ( req, res ) {
  try {
    
  } catch (error) {
    errorHandler( error, res )
  } 
}