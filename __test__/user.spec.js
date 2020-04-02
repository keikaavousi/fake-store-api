const supertest = require('supertest')
const app = require('../app')

describe('testing user API',()=>{
    it('get all users',async()=>{
        const response = await supertest(app).get('/users')
        expect(response.status).toBe(200)
        console.log(response.body)
        expect(response.body).not.toStrictEqual([]);
    })


    it('get a single user',async ()=>{
        const response = await supertest(app).get('/users/2')
        expect(response.status).toBe(200);
        console.log(response.body)
        expect(response.body).not.toStrictEqual({});
        expect(response.body.name).toHaveProperty('firstname');
    },30000)

    it("get users in a limit and sort", async () => {
        const response = await supertest(app).get("/users?limit=3&sort=desc")
        expect(response.status).toBe(200)
        console.log('get with querystring', response.body)
        expect(response.body).not.toStrictEqual([])
        expect(response.body).toHaveLength(3);
    })


    it('add a new user',async () => {
        const response = await supertest(app).post('/users').send({
            email:'John@gmail.com',
            username:'johnd',
            password:'m38rmF$',
            name:{
                firstname:'John',
                lastname:'Doe'
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        })
        expect(response.status).toBe(200);
        console.log(response.body)
        expect(response.body).toHaveProperty('id');
    },30000)


    it('put a user',async () => {
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
        console.log(response.body)
        expect(response.body).toHaveProperty('id');
    })


    it('patch a user',async () => {
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
        console.log(response.body)
        expect(response.body).toHaveProperty('id');
    })


    it('delete a user',async () => {
        const response = await supertest(app).delete('/users/2')
        expect(response.status).toBe(200);
        console.log(response.body)
        expect(response.body).toHaveProperty('id');
    })
   
 })