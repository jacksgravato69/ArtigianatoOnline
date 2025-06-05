const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verificaToken(req, res, next) {

//TODO: CONTROLLARE
  const token = req.cookies.token;

  /*
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  */

  if (!token) {
    
    return res.status(401).json({

      message: 'Token mancante'

    });

  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    req.utente = decoded;

    next();

  } catch (err) {

    return res.status(403).json({

       error: 'Token non valido' 

      });

  }
}

module.exports = verificaToken;