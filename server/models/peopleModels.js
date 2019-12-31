const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://dbAlp:Wolf98%40kemer3489@cluster0-btfdd.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  // sets the name of the DB that our collections are part of
  dbName: 'alpehayatver',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const speciesSchema = new Schema({
  name: String,
  classification: String,
  average_height: String,
  average_lifespan: String,
  hair_colors: String,
  skin_colors: String,
  eye_colors: String,
  language: String,
  homeworld: String,
  homeworld_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'planet',
  },
});
