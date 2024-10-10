const supertest = require('supertest');
const app = require('../app');
const bcrypt = require("bcrypt");
const User = require('../Models/userModel');

const api = supertest(app);

afterEach(async () => {
    await User.deleteMany({});
});

describe('User Controller', () => {
    
    describe('POST /api/users/signup', () => {

        it('should return 400 if any required field is missing', async () => {
            const response = await api
                .post('/api/users/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    username: '',
                    password: 'password123',
                    gender: 'Male',
                    contactNumber: '1234567890',
                    occupation: 'Developer'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("All fields are required");
        });

        it('should return 400 if username is already taken', async () => {
            const user = new User({
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                password: "lLLLAALALA",
                gender: 'Male',
                contactNumber: '1234567890',
                occupation: 'Developer'
            });
            await user.save();

            const response = await api
                .post('/api/users/signup')
                .send({
                    firstName: 'Jane',
                    lastName: 'Smith',
                    username: 'johndoe',
                    password: 'password123',
                    gender: 'Female',
                    contactNumber: '0987654321',
                    occupation: 'Designer'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Username already taken");
        });

        it('should return 201 and a token for successful signup', async () => {
            const response = await api
                .post('/api/users/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe',
                    password: 'password123',
                    gender: 'Male',
                    contactNumber: '1234567890',
                    occupation: 'Developer'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('username', 'johndoe');
            expect(response.body).toHaveProperty('token');
        });

    });

    describe('POST /api/users/login', () => {

        it('should return 400 if the credentials are invalid', async () => {
            const response = await api
                .post('/api/users/login')
                .send({
                    username: 'johndoe',
                    password: 'wrongPassword'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Invalid credentials");
        });

        it('should return 200 and a token for valid credentials', async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const user = new User({
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                password: hashedPassword,
                gender: 'Male',
                contactNumber: '1234567890',
                occupation: 'Developer'
            });
            await user.save();

            const response = await api
                .post('/api/users/login')
                .send({
                    username: 'johndoe',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', 'johndoe');
            expect(response.body).toHaveProperty('token');
        });

    });

});

afterAll(async () => {
    await User.deleteMany({});
});
