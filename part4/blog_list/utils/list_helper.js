const blog = require("../models/blog");

const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) => {
    let counter = 0;
    if (blogs.length>1){
        blogs.forEach(blog => counter+=blog.likes);
    }else if (blogs.length==0){
        return 0
    }else if (blogs.length===1){
        counter+=blogs[0].likes
    }
    return counter
}

const favoriteBlog = (blog) => {
    if (blog.length>1){
        max_blog = blog[0];
        blog.forEach(
            blog => {
                if (blog.likes>max_blog.likes){
                    max_blog=blog;
                }
            }
        
        )
        return max_blog
    }else if (blog.length ===0){
        return []
    }else if (blog.length === 1) {
        return blog[0]
    }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}