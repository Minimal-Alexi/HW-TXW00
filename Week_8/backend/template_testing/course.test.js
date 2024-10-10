const supertest = require('supertest');
const app = require('../app'); 
const Courses = require('../Models/courseModel');
const User = require('../Models/userModel');
const { generateToken } = require('../config/jwtHandling');
const Course = require('../Models/courseModel');
const api = supertest(app);

afterEach(async () => {
    await Courses.deleteMany({});
});

describe('Course Controller', () => {
    const invalidID = "6707d54389ce074af9536183"; // Variable for invalid ID
    const dummyCourse = {
        title: 'Node.js Basics',
        duration: '4 weeks',
        fee: 200,
        instructor: {
            name: 'John Doe',
            contactEmail: 'john.doe@example.com',
            contactPhone: '1234567890'
        }
    };

    let userToken;

    beforeAll(async () => {
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
        userToken = await generateToken(user._id);
    });

    describe('GET /api/courses', () => {
        it('should return an array of courses', async () => {
            await Courses.create(dummyCourse);
            const response = await api.get('/api/courses');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
        });
    });

    describe('GET /api/courses/:courseID', () => {
        it('should return a course by ID', async () => {
            const course = await Courses.create(dummyCourse);
            const response = await api.get(`/api/courses/${course.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', dummyCourse.title);
        });

        it('should return 404 if course not found', async () => {
            const response = await api.get(`/api/courses/${invalidID}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Course not found.");
        });
    });

    describe('POST /api/courses', () => {
        it('should create a new course and return it', async () => {
            const response = await api.post('/api/courses').send(dummyCourse)
            .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', dummyCourse.title);
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await api.post('/api/courses').send({ ...dummyCourse, title: '' })
            .set('Authorization', `Bearer ${userToken}`);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Failed to create Course");
        });

        it('should return 401 if no token is provided', async () => {
            const response = await api.post('/api/courses').send(dummyCourse);
            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Authorization token required");
        });
    });

    describe('PATCH /api/courses/:courseID', () => {
        it('should update a course', async () => {
            const course = await Courses.create(dummyCourse);
            const updatedData = { title: 'Node.js Advanced' };

            const response = await api.patch(`/api/courses/${course.id}`).send(updatedData)
            .set('Authorization', `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', updatedData.title);
        });

        it('should return 404 if course to update is not found', async () => {
            const response = await api.patch(`/api/courses/${invalidID}`).send({ title: 'New Title' })
            .set('Authorization', `Bearer ${userToken}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Course not found.");
        });

        it('should return 401 if no token is provided', async () => {
            const response = await api.patch(`/api/courses/${invalidID}`).send({ title: 'New Title' });
            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Authorization token required"); 
        });
    });

    describe('DELETE /api/courses/:courseID', () => {
        it('should delete a course', async () => {
            const course = await Courses.create(dummyCourse);
            const response = await api.delete(`/api/courses/${course.id}`)
            .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Course deleted successfully.");
        });

        it('should return 404 if course to delete is not found', async () => {
            const response = await api.delete(`/api/courses/${invalidID}`)
            .set('Authorization', `Bearer ${userToken}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Course not found.");
        });

        it('should return 401 if no token is provided', async () => {
            const response = await api.delete(`/api/courses/${invalidID}`);
            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Authorization token required");
        });
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await Course.deleteMany({});
});
