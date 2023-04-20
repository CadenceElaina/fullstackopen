const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./blog_posts_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('verify that the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(blog => blog.id)

  for (const id of ids) {
    expect(id).toBeDefined()
  }
})

test('verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.', async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'React patterns'
  )
})

test('verfies that if the likes property is missing from the request, it will default to the value of 0.', async () => {
  const newBlog = {
    title: 'missing likes property',
    author: 'yes',
    url: 'https://climate.nasa.gov/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('verfies that if the title property is missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
  const newBlog = {
    author: 'yes',
    likes: Infinity,
    url: 'https://climate.nasa.gov/',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})
test('verfies that if the url property is missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
  const newBlog = {
    title: 'missing url :(',
    author: 'yes',
    likes: 0,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})
/* test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'code work selfcare sleep'
  )
})
 */
afterAll(async () => {
  await mongoose.connection.close()
})