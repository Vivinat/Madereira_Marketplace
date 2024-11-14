const request = require('supertest')
const app = require('../../app.js')
const testAuthorization = require('./helpers/testAuthorization.js')

const api = process.env.API_URL;

// Autorização está demorando
const TIME_IN_SECONDS = 40 * 1000
jest.setTimeout(TIME_IN_SECONDS)

describe("GET orders/", () => {
    describe("rota deve retornar todos as ordens", () =>{
        // status code deve ser 200
        test("rota deve responder com status code 200", async () => {
            const token  = await testAuthorization(app)
            const response = await request(app).get(`${api}/pedidos/`).set('Authorization', 'Bearer '+ token)
            expect(response.statusCode).toBe(200)
        })
        // deve retornar um json
        test("rota deve retornar um json", async () => {
            const token  = await testAuthorization(app)
            const response = await request(app).get(`${api}/pedidos/`).set('Authorization', 'Bearer '+ token)
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
        })
    })

})