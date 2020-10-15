const express = require('express')
const app = express()
const bodyParser = require('body-Parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtSecret = "fnsifbsdifoaksdvnklvjbvkljdfvnifdbvfuibvvfdb";


const connection = require('./DataBase/dataBase');
const Games = require('./DataBase/gameDB');
//const Games = require('./DataBase/gameDB') 

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//middleware authentication  but so it's work only with postman because my form of data json not load
function auth (request, response, next){
    const authToken = request.headers['authorization'];
    if (authToken != undefined) {
        
        const bearer = authToken.split(" ");
        const token = bearer[1];

        jwt.verify(token,jwtSecret, (err, data) => {
            if (err) {
                response.status(400);
                response.json({err})
            } else {
                request.token = token;
                request.loggedUser = {id: data.id, email: data.email}
                response.status(200);
                next();

            }
        })

    } else {
        response.status(400)
        response.json({err: "Token invalid 1"})
        
    }    

}


var DB ={
    games: [
        {
            id:20,
            title: "League of legends",
            price: "free",
            year: 2009
           
        },
        {
            id:22,
            title: "Sea of thieves",
            price: 48,
            year: 2018
           
        },
        {
            id:23,
            title: "Minecraft",
            price: 20,
            year: 2012
           
        },
        {
            id: 26,
            title: "God of Wars I",
            price: 60,
            year: 2005
        },
        {
            id: 27,
            title: "God of Wars II",
            price: 60,
            year: 2007
        },
        {
            id: 28,
            title: "God of Wars III",
            price: 60,
            year: 2010
        },
        {
            id: 29,
            title: "God of Wars IV",
            price: 60,
            year: 2018
        },
        {
            id: 30,
            title: "Cyberpunk 2077",
            price: 520,
            year: 2020
        },
        {
            id: 31,
            title: "Final Fantasy 7 Remake ",
            price: 150,
            year: 2020
        },
        {
            id: 32,
            title: "The Last of Us: Part 2",
            price: 160,
            year: 2020
        },
        {
            id: 33,
            title: "No More Heroes 3 ",
            price: 220,
            year: 2020
        }

    ],
    users: [ 
        {
            id: 1,
            name: "Jack",
            email: "game@apioutlook.com",
            pwd: "javascript"
        },
        {
            id: 4,
            name: "mike",
            email: "otaku@apioutlook.com",
            pwd: "lele"
        }
    ]
} 

connection.authenticate().then(() => {
    console.log("connect is success")

}).catch(error => {
    console.log(error + "connect is failed")
})

app.get("/games",(request, response) =>{

 
    response.statusCode = 200;
    response.json(DB.games)
  
});

app.get("/game/:id", (request, response) => {
    
    if (isNaN(request.params.id)) {
        response.sendStatus(400)
    } else {
        //response.send("is a number")
        var id = parseInt(request.params.id);

        var game = DB.games.find(g => g.id == id)
        if( game != undefined){
            response.statusCode == 200;
            response.json(game);
        }else{
            response.sendStatus == 404;
        }
    }
});


app.post("/game",(req, res) => {

    //var id = req.body.id;
    var {id,title, price, year} = req.body;
    //generator id 
    id = Math.floor((Math.random() * 1000) + 1);

    DB.games.push({
        id,
        title,
        price,
        year
            
    });

   

    Games.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.status(200)
    }).catch((error) => {
        console.log(error);
    });

    res.Status(200)

})

app.delete("/game/:id", (request, response) => {
    
    if (isNaN(request.params.id)) {
        response.sendStatus(400)
    } else {
        //response.send("is a number")
        var id = parseInt(request.params.id);
        var index = DB.games.findIndex(g => g.id == id)

        if (index == -1) {
            response.sendStatus(400)

        } else {
            DB.games.splice(index,1)
            response.sendStatus(200);
        }
        
    }

})

app.put("/game/:id", (request, response) => {

    if (isNaN(request.params.id)) {
        response.sendStatus(400)
    } else {
        //response.send("is a number")
        var id = parseInt(request.params.id);
        var game = DB.games.find(g => g.id == id)
        if( game != undefined){
            var {title, price, year} = request.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }

            response.statusCode == 200;
            //response.json(games);
        }else{
            response.sendStatus == 404;
        }
    }
})

app.post("/auth",  (request, response) => {

    var {email, pwd} = request.body;

    if (email != undefined) {
       var user = DB.users.find(u => u.email == email);
       if (user != undefined) {
        if (user.pwd == pwd) {
            jwt.sign({id: user.id, email: user.email}, jwtSecret,{expiresIn: '48h'}, (error, token) => {
                if (error) {
                    response.status(400);
                    response.json({error: "failed"})
                } else {
                    response.status(200);
                    response.json({token: token})
                }
            })
        } else {
            response.status(401);
        }
       } else {
           response.status;
       }
    } else {
        response.status(400);
        response.json({err: "email is invalid"})
    }
})

/* dynamics links for navigation in website
     var HATEOAS = [
            {
                href: "http://localhost:8088/game/" +id,
                method: "DELETE",
                rel: "Delete_game"
            },
            {
                href: "http://localhost:8088/games",
                method: "GET",
                rel: "login"
            }
        ]
*/

app.listen(8088, () => {
    console.log("App is open")

});