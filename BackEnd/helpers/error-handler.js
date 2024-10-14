function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError'){  //erro validação jwt
        return res.status(401).json({message: "Usuario não tem autorização"})
    }

    if (err.name === 'ValidationError'){    //erro de validaçao
        return res.status(401).json({message: err})
    }

    return res.status(500).json(err)    //erro qualquer
}

module.exports = errorHandler;
