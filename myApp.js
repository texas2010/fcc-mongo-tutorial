require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String }]
})

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const newUser = new Person({
    name: 'new User',
    age: 30,
    favoriteFoods: ['pizza', 'pasta']
  });
  newUser.save((error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  });
};

const arrayOfPeople = [
  { name: 'first', age: 34, favoriteFoods: ['salad', 'popcorn'] },
  { name: 'second', age: 52, favoriteFoods: ['cheese', 'chicken'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, user) => {
    if (error) {
      done(error)
    }
    user.favoriteFoods.push(foodToAdd)
    user.save((error, data) => {
      if (error) {
        done(error)
      }
      done(null, data)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet },
    { new: true }, (error, data) => {
      if (error) {
        done(error)
      }
      done(null, data)
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, data) => {
    if (error) {
      done(error)
    }
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 })
    .limit(2).select({ age: 0 })
    .exec((error, data) => {
      if (error) {
        done(error)
      }
      done(null, data)
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
