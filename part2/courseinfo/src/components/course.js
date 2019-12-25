import React from 'react'

const Course = (props) => {
    //console.log(props.course.parts)
    //console.log(props.course.name)
  return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
}
const Header = (props) => {

  //console.log(props.course)
    return (
        <div>
            <h2>
               {props.course} 
            </h2>
        </div>
    )
}
const Content = ({parts}) => {
    console.log(parts)
  const rows = () => parts.map(part =>
      <Part 
        key={part.id}
        part={part}
      />
    )

    return (
      <div>
          {rows()}
      </div>
    )
  }

const Part = (props) => {
  console.log(props)
    return (
        <div>
            <p>
            {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}
const Total = ({parts}) => {
    console.log(parts)
    const tot = parts.reduce( (s, p) => {
      console.log('what is happening', s,p.exercises)
      return s + p.exercises 
    }, 0)
      /*
    function sum (parts, total) {
        parts.forEach(element => {
            total += element.exercises
        });
        return total
    } 
    */
    return (
        <div>
            <h3>
            total of {tot} exercises
            </h3>
        </div>
    )
}

export default Course