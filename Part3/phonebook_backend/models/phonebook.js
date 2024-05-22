require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User name required'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d+/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
    required: [true, 'User phone number required'],
  },
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personsSchema)
