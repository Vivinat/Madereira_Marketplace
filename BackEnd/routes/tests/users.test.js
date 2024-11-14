const request = require('supertest')
const app = require('../../app.js')
const testAuthorization = require('./helpers/testAuthorization.js')

const api = process.env.API_URL;

// Autorização está demorando
const TIME_IN_SECONDS = 40 * 1000
jest.setTimeout(TIME_IN_SECONDS)

describe("GET usuários/", () => {
    describe("rota deve retornar todos as categorias", () =>{

        // status code deve ser 200
        test("rota deve responder com status code 200", async () => {
            const token  = await testAuthorization(app)
            const response = await request(app).get(`${api}/usuarios/`).set('Authorization', 'Bearer ' + token)
            expect(response.statusCode).toBe(200)
        })
        // deve retornar um json
        test("rota deve retornar um json", async () => {
            const token  = await testAuthorization(app)
            const response = await request(app).get(`${api}/usuarios/`).set('Authorization', 'Bearer ' + token)
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
        })
    })

})

describe("Login", () =>{
    describe("Rota deve receber um body com usuário e login e retonar um token de acesso", () => {

        test("rota deve responder com status code 200", async () => {
            const response = await request(app).post(`${api}/usuarios/login`).send({
                email: "madeira",
                password: "teste3"
            })
            expect(response.statusCode).toBe(200)
        })

        test("rota deve retornar um json", async () => {
            const response = await request(app).post(`${api}/usuarios/login`).send({
                email: "madeira",
                password: "teste3"
            })
            expect(response.header["content-type"]).toEqual(expect.stringContaining("json"))
        })

        test("rota deve conter um token de acesso", async () => {
            const response = await request(app).post(`${api}/usuarios/login`).send({
                email: "madeira",
                password: "teste3"
            })
            expect(response.body["token"]).toBeDefined()
        })

    })
})