const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect( config.DBHost,{
  // useMongoClient: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected!')
})
.catch(function(err){
  console.error(err)
})