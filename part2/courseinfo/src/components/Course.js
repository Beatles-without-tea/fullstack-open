import React from 'react'

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

  export default Course
  