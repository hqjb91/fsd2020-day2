//Importing libraries
const express = require('express');
const hbs = require('express-handlebars');

//Set up express instance
const app = express();

//Set up port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

//Define roll function
const rolldice = () => Math.floor(Math.random() * 6 + 1);

//Set up handlebars
app.engine('hbs', hbs({
    defaultLayout: 'default.hbs'
}));

app.set('view engine', 'hbs');

//Serve static files
app.use(express.static(__dirname + '/public'));

//Handle index page requests
app.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.render('index');
});

//Handle roll requests
app.get('/roll', (req, res) => {
    let imageFile1 = `/images/dice${rolldice()}.png`;
    let imageFile2 = `/images/dice${rolldice()}.png`;
    res.status(200);
    res.type('text/html');
    res.render('roll', {imageFile1, imageFile2});
});

//Redirect to index
app.use((req, res) => {
    res.render('index');
});

//Start the app
app.listen(PORT, () => {
    console.log(`You have connected on port : ${PORT} at ${new Date()}`);
})