const listHelper = require('../utils/list_helper')



test('dummy returns one',() => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
    })

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const blogs = [
        {
            "_id": "62cfde495c792e209c7a9d40",
            "title": "The wonderfulworld of Superdogman",
            "author": "max the magnanimous",
            "url": "www.idk.com",
            "likes": 500000
            },
            {
            "_id": "62cfdf62d72936fc69edd387",
            "title": "super dogman",
            "author": "09678978393",
            "url": "www.test_link.com",
            "likes": 10000,
            "__v": 0
            },
            {
                "_id": "62d01e6dc88f448f62f286f9",
                "title": "super cat",
                "author": "max",
                "url": "www.test_link.com",
                "likes": 3,
                "__v": 0
              },
              {
                "_id": "62d01e86c88f448f62f286fb",
                "title": "words for wisdom",
                "author": "john",
                "url": "www.test_link.com",
                "likes": 10,
                "__v": 0
              }
    ]
    test('totalLikes returns sum of likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(510013)
    })
    test('totalLikes with only one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('totalLikes with empty array', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})


describe('favoriteBlog', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const blogs = [
        {
            "_id": "62cfde495c792e209c7a9d40",
            "title": "The wonderfulworld of Superdogman",
            "author": "max the magnanimous",
            "url": "www.idk.com",
            "likes": 500000
            },
            {
            "_id": "62cfdf62d72936fc69edd387",
            "title": "super dogman",
            "author": "09678978393",
            "url": "www.test_link.com",
            "likes": 10000,
            "__v": 0
            },
            {
                "_id": "62d01e6dc88f448f62f286f9",
                "title": "super cat",
                "author": "max",
                "url": "www.test_link.com",
                "likes": 3,
                "__v": 0
              },
              {
                "_id": "62d01e86c88f448f62f286fb",
                "title": "words for wisdom",
                "author": "john",
                "url": "www.test_link.com",
                "likes": 10,
                "__v": 0
              }
    ]

    test('returns max likes of all' ,() => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(
            {
                "_id": "62cfde495c792e209c7a9d40",
                "title": "The wonderfulworld of Superdogman",
                "author": "max the magnanimous",
                "url": "www.idk.com",
                "likes": 500000
                }
        )
    })
    test('returns max likes of one' ,() => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              }
        )
    })
    test('returns max likes of none' ,() => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual([])
    })
})

describe('mostLikes', () =>{
    const blogs = [
        {
            "_id": "62cfde495c792e209c7a9d40",
            "title": "The wonderfulworld of Superdogman",
            "author": "phil",
            "url": "www.idk.com",
            "likes": 500000
            },
            {
            "_id": "62cfdf62d72936fc69edd387",
            "title": "super dogman",
            "author": "phil",
            "url": "www.test_link.com",
            "likes": 10000,
            "__v": 0
            },
            {
                "_id": "62d01e6dc88f448f62f286f9",
                "title": "super cat",
                "author": "phil",
                "url": "www.test_link.com",
                "likes": 3,
                "__v": 0
              },
              {
                "_id": "62d01e86c88f448f62f286fb",
                "title": "words for wisdom",
                "author": "john",
                "url": "www.test_link.com",
                "likes": 10,
                "__v": 0
              }
    ]
    test('returns max likes', ()=>{
        result = listHelper.mostLikes(blogs)
        expect(result).toEqual(
            {"author" : 'phil',
            "likes": 510003
        }
        )
    })
})

describe('mostBlogs' , () => {
    
    const blogs = [
        {
            "_id": "62cfde495c792e209c7a9d40",
            "title": "The wonderfulworld of Superdogman",
            "author": "phil",
            "url": "www.idk.com",
            "likes": 500000
            },
            {
            "_id": "62cfdf62d72936fc69edd387",
            "title": "super dogman",
            "author": "phil",
            "url": "www.test_link.com",
            "likes": 10000,
            "__v": 0
            },
            {
                "_id": "62d01e6dc88f448f62f286f9",
                "title": "super cat",
                "author": "phil",
                "url": "www.test_link.com",
                "likes": 3,
                "__v": 0
              },
              {
                "_id": "62d01e86c88f448f62f286fb",
                "title": "words for wisdom",
                "author": "john",
                "url": "www.test_link.com",
                "likes": 10,
                "__v": 0
              }
    ]
    test( 'return max liked author' ,() => {
        result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            {"author" : 'phil',
            "blogs": 3
        })

    }) 






})