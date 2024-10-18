const request = require('supertest')
const app = require('../../app.js')

const api = process.env.API_URL;
describe("GET orders/", () => {
    describe("rota deve retornar todos as ordens", () =>{
        // status code deve ser 200
        test("rota deve responder com status code 200", async () => {
            const response = await request(app).get(`${api}/pedidos/`)
            expect(response.statusCode).toBe(200)
        })
        // deve retornar um json
        test("rota deve retornar um json", async () => {
            const response = await request(app).get(`${api}/pedidos/`)
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
        })
    })

})