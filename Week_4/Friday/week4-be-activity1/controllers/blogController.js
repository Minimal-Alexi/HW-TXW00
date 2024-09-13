const Blog = require("../models/blogModel");

// GET /Blogs
const getAllBlogs = async (req, res) => {
  const Blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(Blogs);
};

// POST /Blogs
const createBlog = async (req, res) => {
  const newBlog = await Blog.create({ ...req.body });
  res.status(201).json(newBlog);
};

// GET /Blogs/:BlogId
const getBlogById = async (req, res) => {
  const { BlogId } = req.params;

  const blog = await Blog.findById(BlogId);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// PUT /Blogs/:BlogId
const updateBlog = async (req, res) => {
  const { BlogId } = req.params;

  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: BlogId },
    { ...req.body },
    { new: true, overwrite: true }
  );
  if (updatedBlog) {
    res.status(200).json(updatedBlog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// DELETE /Blogs/:BlogId
const deleteBlog = async (req, res) => {
  const { BlogId } = req.params;

  const deletedBlog = await Blog.findOneAndDelete({ _id: BlogId });
  if (deletedBlog) {
    res.status(200).json({ message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
