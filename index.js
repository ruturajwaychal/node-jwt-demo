const express = require("express");
const jasonwebtoken = require("jsonwebtoken");
const secretKey = "secretKey";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "a sample api of jwt",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    userName: "ruturaj",
    email: "ruturaj@gmail.com",
  };

  jasonwebtoken.sign(
    { user },
    secretKey,
    { expiresIn: "300s" },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
});

app.post("/profile", verifyToken, (req, res)=> {
    jasonwebtoken.verify(req.token,secretKey, (err, authData) => {
        if(err){
            res.send({
                message: "Profile Access Denied"
            })
        } else {
            res.json ({
                message: "Welcome to Profile",
                authData
            })
        }
    })
})


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== undefined ){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1]
        req.token = token;
        next();
    }else {
        res.send({
            result: "the token is not valid"
        })
    }
}

app.listen(5000, () => {
  console.log("app is running on 5000");
});
