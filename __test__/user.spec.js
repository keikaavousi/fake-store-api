const supertest = require('supertest')
const app = require('../app')

describe('testing user API',()=>{
    it('get all users',async()=>{
        const response = await supertest(app).get('/users')
        expect(response.status).toBe(200)
        console.log(response.data)
        expect(response.body).toStrictEqual([]);
    })


    it('get a single user',async ()=>{
        const response = await supertest(app).get('/users/2')
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.body).toStrictEqual({});
        expect(response.body).toHaveProperty('firstname');
    })

    it("get users in a limit and sort", async () => {
        const response = await supertest(app).get("/users?limit=3&sort=desc")
        expect(response.status).toBe(200)
        console.log('get with querystring', response.body)
        expect(response.body).not.toStrictEqual([])
        expect(response.data).toHaveLength(3);
    })


    it('add a new user',async () => {
        const response = await supertest(app).post('/users').send({
            email:'mrk@y.com',
            username:'mrk',
            password:'1234566',
            name:{
                firstname:'mohamamdreze',
                lastname:'kei'
            },
            avatar:'http://test.com',
            address:{
                city:'tehran',
                street:'blv',
                alley:'aval',
                number:3,
                geolocation:{
                    lat:'123.345354',
                    long:'54.23424'
                }
            },
            phone:'+989123456783'
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('edit a user',async () => {
        const response = await supertest(app).put('/users/2').send({
            email:'mrk@y.com',
            username:'mrk',
            password:'1234566',
            name:{
                firstname:'mohamamdreze',
                lastname:'kei'
            },
            avatar:'http://test.com',
            address:{
                city:'tehran',
                street:'blv',
                alley:'aval',
                number:3,
                geolocation:{
                    lat:'123.345354',
                    long:'54.23424'
                }
            },
            phone:'+989123456783'
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('edit a user',async () => {
        const response = await supertest(app).patch('/users/2').send({
            email:'mrk@y.com',
            username:'mrk',
            password:'1234566',
            name:{
                firstname:'mohamamdreze',
                lastname:'kei'
            },
            avatar:'http://test.com',
            address:{
                city:'tehran',
                street:'blv',
                alley:'aval',
                number:3,
                geolocation:{
                    lat:'123.345354',
                    long:'54.23424'
                }
            },
            phone:'+989123456783'
        })
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })


    it('edit a user',async () => {
        const response = await supertest(app).delete('/users/2')
        expect(response.status).toBe(200);
        console.log(response.data)
        expect(response.data).toHaveProperty('id');
    })
   
})