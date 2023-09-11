require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  //middleware funciton takes in three parameters
  isAuthenticated: (req, res, next) => {
    //extract the JWT token from the HTTP request's Authorization header
    const headerToken = req.get("Authorization");
    //if no Authentication header, log error and send 401 in the response
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;
    //verify the JWT token using jwt.verify(), if verification turns out unsuccessful, catch error send 500 status code
    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    //check if the token is falsy(empty), if token is falsy, create error object, send 401 status code
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    //if token is valid and user is authenticated, next() is called, allow request to proceed to the next middleware or route handler
    next();
  },
};
