const request = require('supertest')
const app = require('../../app.js')

describe("GET produtos/", () => {
    describe("rota deve retornar todos os produtos", () =>{
        // status code deve ser 200
        test("rota deve responder com status code 200", async () => {
            const response = await request(app).get("/api/v1/produtos/")
            expect(response.statusCode).toBe(200)
        })
    })

})