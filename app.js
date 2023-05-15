// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blog');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();
// app.listen()
//connect to mongodb
const dbURI = 'mongodb+srv://Gautam:gautam20@blogsitecluster.wxldwto.mongodb.net/node-tuts?retryWrites=true&w=majority';
// mongodb+srv://<username>:<password>@blogsitecluster.wxldwto.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(8000))
  .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for request


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use((req, res, next)=>{
  res.locals.path=req.path;
  next();
})


//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


//redirects
   app.get('/blogs/create',(req,res)=>{
    res.render('create',{ title: 'create a new Blog'});
   })

   app.use('/blogs', blogRoutes);

   //404 page
   app.use(function(req, res, next) {
    res.status(404).render('404', { title: 'Page Not Found' });
  });