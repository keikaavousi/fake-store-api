const supertest = require('supertest')
const app = require('../app')

describe('testing cart API',()=>{
    it('get all users',async()=>{
        const response = await supertest(app).get('/carts')
        expect(response.status).toBe(200)
        console.log(response.data)
        expect(response.body).toStrictEqual([]);
    })


    it('get a single cart',async ()=>{
        const response = await supertest(app).get('/carts/2')
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.body).toStrictEqual({});
        expect(response.body).toHaveProperty('userId');
    })

    it("get carts in a limit and sort", async () => {
        const response = await supertest(app).get("/carts?limit=2&sort=desc&userid=2")
        expect(response.status).toBe(200)
        
        console.log('get with querystring', response.body)

        expect(response.body).not.toStrictEqual([])
        expect(response.data).toHaveLength(2);
        expect(response.data.userid).toHaveProperty('userId',2);
    })

    it("get carts in date range", async () => {
        const response = await supertest(app).get("/carts?startdate=2020-10-02&enddate=2020-05-03")
        expect(response.status).toBe(200)
        
        console.log('get with date range', response.body)

        expect(response.body).not.toStrictEqual([])
        expect(response.data.userid).toHaveProperty('userId',2);
    })


    it('add a new cart',async () => {
        const response = await supertest(app).post('/carts').send({
            userId:1,
            date:2020-10-10,
            products:[{productId:2,quantity:4},{productId:1,quantity:10},{productId:5,quantity:2}]
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('edit a cart',async () => {
        const response = await supertest(app).put('/carts/2').send({
            userId:1,
            date:2020-10-10,
            products:[{productId:2,quantity:4},{productId:1,quantity:10},{productId:5,quantity:2}]
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('edit a cart',async () => {
        const response = await supertest(app).put('/carts/2').send({
            userId:1,
            date:2020-10-10,
            products:[{productId:2,quantity:4},{productId:1,quantity:10},{productId:5,quantity:2}]
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('delete a cart',async () => {
        const response = await supertest(app).delete('/carts/2')
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })
   
})