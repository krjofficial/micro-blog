const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/Blogroutes'); // Corrected require statement




// create express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://krjofficial:micro-blog@cluster0.fzztzjc.mongodb.net/micro-blog?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) //listen for requests only when cluster is connected
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // passes urlencoded data into an object
app.use(morgan('dev'));


//non blog routes
app.get('/' , (req, res) => {
    res.redirect('/blogs');
});
app.get('/about' , (req, res) => {
    res.render('about', {title: 'About us'});
});


//redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


//blog routes
app.use('/blogs', blogRoutes);


// 404 page - always at bottom
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error'});
})



