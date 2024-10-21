const request = require('supertest')
const app = require('../../app.js')

const api = process.env.API_URL;

// Autorização está demorando
const TIME_IN_SECONDS = 40 * 1000
jest.setTimeout(TIME_IN_SECONDS)
describe("GET categorias/", () => {
    describe("rota deve retornar todos as categorias", () =>{
        // status code deve ser 200
        test("rota deve responder com status code 200", async () => {
            const response = await request(app).get(`${api}/categorias/`)
            expect(response.statusCode).toBe(200)
        })
        // deve retornar um json
        test("rota deve retornar um json", async () => {
            const response = await request(app).get(`${api}/categorias/`)
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
        })
    })

})