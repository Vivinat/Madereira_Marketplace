const request = require('supertest')
const api = process.env.API_URL;

async function testAuthorization(app) {
    const response = await request(app).post(`${api}/usuarios/login`).send({
        email: "madeira",
        password: "teste3"
    })

    return response.body["token"]
}

module.exports = testAuthorization