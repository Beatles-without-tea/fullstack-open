import blogService from '../services/blogs'


const deleteBlog = async({blog, user, setBlogs, compareNums}) => {
    console.log(blog)
    console.log(blog.id)
    // try {
      console.log(user.token)
      await blogService.setToken(user.token)
      // console.log(blog.user.token)
      const deletion =  await blogService.remove(blog.id)
      console.log(deletion)
      await blogService.getAll().then(blogs =>
        setBlogs(blogs.sort(compareNums) )
      )  
    //   }catch(exception){
    //     setErrorMessage('wrong')
    //     setTimeout(() => {
    //       setErrorMessage(null)
    //       console.log('error')
    //     }, 5000)
    //   }
    }

const updateBlog = async({blog,compareNums,setBlogs}) => {
        console.log(blog)
        var updatedBlog = {title:blog.title, 
                      author:blog.author, 
                      url:blog.url, 
                      id:blog.id,
                      likes:blog.likes+1}
        // try {
          console.log({
            updatedBlog
             })
          const creation =  await blogService.update(blog.id,updatedBlog)
          console.log('success')
          console.log(creation)
          await blogService.getAll().then(blogs =>
            setBlogs( blogs.sort(compareNums) )
          )  
        //   }catch(exception){
        //     setErrorMessage('wrong')
        //     setTimeout(() => {
        //       setErrorMessage(null)
        //       console.log('error')
        //     }, 5000)
        //   }
    }

export {deleteBlog,updateBlog}