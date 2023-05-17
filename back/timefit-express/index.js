import express from 'express';

const app = express(); // Creating an instance of the express application

app.use(express.json()) // Middleware to parse incoming JSON data

// Handling GET request to the root URL ('/')
app.get('/', (req,res) =>{
    res.send('send help...');
})

// Starting the server on port 4444 and handling any potential errors
app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
     console.log('running');
})