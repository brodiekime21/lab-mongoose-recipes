  // .then(() => {
  //   Recipe.create(data)
  //     .then(title => console.log('The recipe is saved and its title is: ', title))
  //     .catch(error => console.log('An error happened while saving a new user:', error));


  const mongoose = require('mongoose');

  // Import of the model Recipe from './models/Recipe.model.js'
  const Recipe = require('./models/Recipe.model');
  // Import of the data from './data.json'
  const data = require('./data');
  
  const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
  
  // Connection to the database "recipe-app"
  mongoose
    .connect(MONGODB_URI)
    .then(x => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany()
    })

    //1 recipe
    .then(() => {
      return Recipe.create(
        {
          "title": "Asian Glazed Chicken Thighs 1",
          "level": "Amateur Chef",
          "ingredients": [
            "1/2 cup rice vinegar",
            "5 tablespoons honey",
            "1/3 cup soy sauce (such as Silver Swan®)",
            "1/4 cup Asian (toasted) sesame oil",
            "3 tablespoons Asian chili garlic sauce",
            "3 tablespoons minced garlic",
            "salt to taste",
            "8 skinless, boneless chicken thighs"
          ],
          "cuisine": "Asian",
          "dishType": "main_course",
          "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
          "duration": 40,
          "creator": "Chef LePapu"
        }
      )
      .then((createdRecipe) => {
        console.log(createdRecipe.title)
      })
      .catch((err) => {
        console.log(err)
      })
    })

    //All recipes
    .then((createdRecipes) => {
      return Recipe.insertMany(data)
      
      .then((createdRecipes) => {
      data.forEach((elm)=>{
        console.log(elm.title)
      })
      })
      .catch((err) => {
      console.log(err)
      })
    })

    .then(()=>{
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set:{duration: 100}})
      .then(() => {
        console.log("Changes made")
      })
      .catch((err) => {
        console.log(err)
      })
    })
    
    .then(()=>{
      return Recipe.deleteOne({title: 'Carrot Cake'})
      .then(() => {
        console.log("Deleted")
      })
      .catch((err) => {
        console.log(err)
      })
    })

    .then(()=>{
      mongoose.connection.close(() =>{
      console.log('Mongoose default connection closed');
    });
  })


    .catch(error => {
      console.error('Error connecting to the database', error);
    });
  


//     mongoose.connection.close(function () {
//   console.log('Mongoose default connection closed');
// });