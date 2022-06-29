import { useState } from 'react'

const Course = ({course}) => {
  const arr_exercises = course.parts.map(part => part.exercises)
  const sum_exercises = arr_exercises.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  )
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)}
      
      <b> total of {sum_exercises} exercices </b>
    </div>

  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return courses.map(course_ele => <Course key={course_ele.id} course={course_ele}/>)
}
export default App