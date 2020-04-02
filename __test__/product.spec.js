const supertest = require("supertest")
const app = require("../app")

describe("Testing products API", () => {
    it("all product", async () => {
        const response = await supertest(app).get("/products")
        expect(response.status).toBe(200)
        console.log('get', response.body)
        expect(response.body).not.toStrictEqual([])
    })

    it("get a single product", async () => {
        const response = await supertest(app).get("/products/1")
        expect(response.status).toBe(200)
        console.log('get by id', response.body)
        expect(response.body).not.toStrictEqual({})
        expect(response.body).toHaveProperty('title')
    })


    it("get products in a category", async () => {
        const response = await supertest(app).get("/products/category/jewelery")
        expect(response.status).toBe(200)
        console.log('get by category', response.body)
        expect(response.body).not.toStrictEqual([])
    })


    it("get products in a limit and sort", async () => {
        const response = await supertest(app).get("/products?limit=3&sort=desc")
        expect(response.status).toBe(200)
        console.log('get with querystring', response.body)
        expect(response.body).not.toStrictEqual([])
        expect(response.body).toHaveLength(3);
    })

    it("post a product", async () => {
        const response = await supertest(app).post('/products').send({
            title: 'test',
            price: 13.5,
            description: 'test desc',
            image: 'test img',
            category: 'text cat'
        })
        expect(response.status).toBe(200)
        console.log('post', response.body)
        expect(response.body).toHaveProperty('id')
    })

    it("put a product", async () => {
        const response = await supertest(app).put('/products/1').send({
            title: 'test',
            price: 13.5,
            description: 'test desc',
            image: 'test img',
            category: 'text cat'
        })
        expect(response.status).toBe(200)
        console.log('put', response.body)
        expect(response.body).toHaveProperty('id')
    })


    it("patch a product", async () => {
        const response = await supertest(app).patch('/products/1').send({
            title: 'test',
            price: 13.5,
            description: 'test desc',
            image: 'test img',
            category: 'text cat'
        })
        expect(response.status).toBe(200)
        console.log('patch', response.body)
        expect(response.body).toHaveProperty('id')
    })


    it('delete a product', async () => {
        const response = await supertest(app).put('/products/1')
        expect(response.status).toBe(200)
        console.log('delete', response.body)
        expect(response.body).toHaveProperty('id')
    })

})
