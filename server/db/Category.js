const mongoose = require('mongoose')
const {OTHERS} = require('./constants')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
})



const Category = mongoose.model('Category', CategorySchema)

function promisedApi (Model, method, ...rest) {
  return function (...args) {
    let finalArgs = [...rest, ...args]
    return new Promise((resolve, reject) => {
      Model[method](...finalArgs, (err, result) => {
        if(err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }
}

const methods = {}
methods.$create = async function $create({ name }) {
  return Category.create({ name })
}

/**
 * no params
 */
methods.$readList = promisedApi(Category, 'find', {})

/**
 * $findOne(queryObj)
 */
methods.$findOne = promisedApi(Category, 'findOne')

/**
 * @param {*} id 
 */
const findOneAndRemove = promisedApi(Category, 'findOneAndRemove')

methods.$delete = async function $delete(query) {
  if(query.name.toLowerCase() === OTHERS) {
    throw new Error('不能删除 others')
  }
  return findOneAndRemove(query)
}

methods.$findOne({name: OTHERS})
  .then(doc => {
    if(!doc) {
      methods.$create({name: OTHERS})
    }
  })

module.exports = methods