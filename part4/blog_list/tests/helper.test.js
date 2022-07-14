const listHelper = require('../utils/list_helper')


test('dummy returns one',() => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
    })

describe('total likes', () => {
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
        const result = listHelper.totalLikes(blogs[0])
        expect(result).toBe(500000)
    })
    test('totalLikes with only one blog', () => {
        const result = listHelper.totalLikes(blogs[1])
        expect(result).toBe(10000)
    })
    test('totalLikes with only one blog', () => {
        const result = listHelper.totalLikes(blogs[2])
        expect(result).toBe(3)
    })
    test('totalLikes with empty array', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})