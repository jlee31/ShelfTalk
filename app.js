const express = require('express');
const app = express();
const port = 3000;

let posts = [
    {
      id: 1,
      title: 'First Blog Post',
      content: 'This is my first blog post!',
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      title: 'Fourth Wing',
      content: "Not a bad book",
      date: new Date().toLocaleTimeString()
    }
  ];

  // Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
  });
  
app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('post', { post });
  });
  
app.get('/create', (req, res) => {
    res.render('create');
  });
  
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      date: new Date().toLocaleDateString()
    };
    posts.push(newPost);
    res.redirect('/');
  });
  
app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
  });
  