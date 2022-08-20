const ExtraBlogDetails = ({blog,updateBlog,deleteBlog}) => (
      <div className="extraDetail">
      <p>{blog.url}</p>
      <div className='row'>
        <p>likes {blog.likes} </p> 
        <button onClick={() => updateBlog({blog})}   className='likeButton'>like</button>
      </div>
      <p>{blog.author}</p>
      <button onClick={() => deleteBlog({blog})}>delete</button>
    </div>
)

export default ExtraBlogDetails