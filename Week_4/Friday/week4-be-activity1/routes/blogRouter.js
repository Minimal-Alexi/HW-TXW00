const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  // patchBlog
} = require("../controllers/blogController");

// GET /Blogs
router.get("/", getAllBlogs);

// POST /Blogs
router.post("/", createBlog);

// GET /Blogs/:BlogId
router.get("/:BlogId", getBlogById);

// PUT /Blogs/:BlogId
router.put("/:BlogId", updateBlog);

// DELETE /Blogs/:BlogId
router.delete("/:BlogId", deleteBlog);

// Update Blog using PATCH 
// router.patch('/:BlogId', patchBlog)

module.exports = router;
