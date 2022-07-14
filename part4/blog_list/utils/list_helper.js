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
    }else {
        counter+=blogs.likes
    }
    return counter
}

module.exports = {
    dummy,
    totalLikes
}