# Readme 
//set header content type
     res.setHeader('content-Type','text/html');
    // res.write('<head><link rel="stylesheet" href="#"></link></head>');
    // res.write('<p>Hello Gangs</p>');
    // res.write('<p>Hello Gangs</p>');
    // res.end();
_____________________________________________________________________________________________

# to send the html code without making the file
//  res.send('<p>Home page<p>');

but it is alway better to make a file that we wants to redirect to rather than sending the html file dierectly. 
_____________________________________________________________________________________________
# 404.html

<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node.js crash course</title>
</head>
<body>
    <h1>404-OOOps!</h1>
    <h2>That Page doesn't exist</h2>
</body>
</html>
_____________________________________________________________________________________________
# about.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js crash Course</title>
</head>
<body>
    <h1>About</h1>
    <h2>Hello MY name is Gautam Kushwaha</h2>
    
    <nav>
        <a href="/">Homepage</a>
        <a href="/about">About Page</a>
      </nav>
</body>
</html>

_____________________________________________________________________________________________
# index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js crash Course</title>
</head>
<body>
    <h1>Gautam</h1>
    <h2>Your path to becoming Node.js Ninja</h2>
    <!-- <nav>
        <a href="/">Homepage</a>
        <a href="/about">About page</a>
      </nav> -->

      <nav>
        <a href="/">Homepage</a>
        <a href="/about">About Page</a>
      </nav>
    
</body>
</html>
_____________________________________________________________________________________________

# server.js

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  console.log(req.url)

  //lodash
  const number = _.random(0, 20);
  console.log(number);

  const greet = _.once(()=>{
    console.log("hello");
  });

  greet();
  greet();
  
  //set header content type
  res.setHeader('content-Type', 'text/html');

  // routing
  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-hari':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    // res.write(data)
    res.end(data)
  })
}

);



server.listen(3001, 'localhost', () => {
  console.log("lis for requests on port 3001");
}
);


_____________________________________________________________________________________________

# app.js

const express = require('express');


//express app
const app = express();

//listen for request
 app.listen(3002);

 // create header and statuscode on itself
 app.get('/', (req, res)=>{
//  res.send('<p>Home page<p>');

    res.sendFile('./views/index.html',{root:__dirname});
   
})

app.get('/about', (req, res)=>{
   // res.send('<p>This is about page page<p>');

   res.sendFile('./views/about.html',{root:__dirname});
   })

   //redirects
   app.get('/about-us',(req,res)=>{
    res.redirect('/about');
   })

   //404 page
   app.use((req,res)=>{
    res.status(404).sendFile('./views/index.html',{root:__dirname});
   });

   ___________________________________________________________________________
   # server side Rendering


  ______________________________________________________
   
   # middlewares
  ______________________________________________________
      //middleware
 app.use((req,res, next) =>{
  console.log("new request made:");
  console.log("host:", req.hostname);
  console.log("path:",req.path);
  console.log("method:",req.method);
   next();

 })

 app.use((req, res, next)=>{
  console.log('in the next middleware');
  next();
 })
______________________________________________________
video: 9


# app.js

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');



//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Gautam:gautam20@blogsitecluster.wxldwto.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3002))
  .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for request


//middleware and static files
app.use(express.static('public'));

app.use(morgan('dev'));

//mongoose and mongo tests
app.get('/add-blog',(req, res)=>{
  const blog = new Blog({
    title: 'new Blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
  blog.save()
  .then(result=>{
    res.send(result);
  })
  .catch(err =>{
    console.log(err);
  })
})
app.use(morgan('dev'));
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog',(req,res)=>{
  Blog.findById('64503e3ef2805fcd9415bba4')
  .then(result =>{
    res.send(result);
  })
  .catch(err =>{
    console.log(err);
  })
})

 // create header and statuscode on itself routes
 app.get('/', (req, res)=>{

   const blogs =[
    {title: 'Gautam finds Ramayan', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Kumar  finds Mahabharat', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Kushwaha finds Vedas', snippet: 'Lorem ipsum dolor sit amet consectetur'},
]; 
res.render('index', { title: 'Home', blogs});
})

app.get('/about', (req, res)=>{


    res.render('about',{ title: 'About'});
   })

   //redirects
   app.get('/blogs/create',(req,res)=>{
    res.render('create',{ title: 'create a new Blog'});
   })


   app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result =>{
      res.render('index',{blogs: result, title: 'All blogs'});
    })
    .catch(err => {
      console.log(err)
    });
   })

   //404 page
   app.use((req,res)=>{
    res.status(404).render('404')
   });
//const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  console.log(req.url)

  //lodash
  const number = _.random(0, 20);
  console.log(number);

  const greet = _.once(()=>{
    console.log("hello");
  });

  greet();
  greet();
  
  //set header content type
  res.setHeader('content-Type', 'text/html');

  // routing
  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-hari':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    // res.write(data)
    res.end(data)
  })
}

);



server.listen(3001, 'localhost', () => {
  console.log("lis for requests on port 3001");
}
);