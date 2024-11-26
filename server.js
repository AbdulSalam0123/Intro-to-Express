const collectibles = 
[
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

const express = require('express');
const validator = require('validator');


const app = express();

app.get('/greetings/:name', (req,res)=>
{
    // console.log(req.param.name);
    res.send(`Greetings ${req.params.name}.`);
})

app.get('/roll/:number',(req,res)=>
{
    let random=Math.floor(Math.random()*(req.params.number))+1;
    if(validator.isInt(req.params.number))
    {
        res.send(`You rolled: ${random}`);
    }
    else
    {
        res.send("Enter a valid number");
    }
})

app.get('/collectibles/:index',(req,res)=>
{
    const length=collectibles.length;
    if(req.params.index<length)
    {
        res.send(`You want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}. It can be yours!`)
    }
})

app.get('/shoes', (req, res) => {
    const selectedShoes = [];
    if (Object.keys(req.query).length !== 0) 
    {
        shoes.forEach(element => {
            if ((req.query['min-price'] ? parseFloat(req.query['min-price']) < element.price : true) && (req.query['max-price'] ? parseFloat(req.query['max-price']) > element.price : true) && (req.query.type ? req.query.type === element.type : true)) 
            {
                selectedShoes.push(element);
            }
        });
        res.send(selectedShoes.length > 0 ? selectedShoes : 'No shoes match the criteria');
    } 
    else 
    {
        res.send(shoes);
    }
});


app.listen(3000, ()=>
{
    console.log("Listening on Port: 3000!");
});