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

const mostBlogs = (blogs) => {
    counter = {} 
    blogs.forEach( blog => {
        counter[blog.author]=0
    })
    blogs.forEach( blog => {
        counter[blog.author]+=1
    })
    var arr = Object.keys( counter ).map(function ( key ) { return counter[key]; });
    var blog_count = Math.max.apply( null, arr );
    const author = Object.entries(counter).reduce((a, counter) => 
    a[1] > counter[1] ? a : counter)[0]
    return {"author": author,"blogs": blog_count}
}


const mostLikes = (blogs) => {
    counter = {} 
    blogs.forEach( blog => {
        counter[blog.author]=0
    })
    blogs.forEach( blog => {
        counter[blog.author]+=blog.likes
    })
    var arr = Object.keys( counter ).map(function ( key ) { return counter[key]; });
    var like_count = Math.max.apply( null, arr );
    const author = Object.entries(counter).reduce((a, counter) => 
    a[1] > counter[1] ? a : counter)[0]
    return {"author": author,"likes": like_count}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}