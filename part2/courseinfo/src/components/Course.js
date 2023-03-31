import React from 'react'

const Course = ({ course }) => {
    //console.log(course)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({ parts }) => {
    //console.log('parts:', parts)
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </div>

    )
}
const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}
const Total = ({ parts }) => {
    /*     const ex = parts.reduce((sum, part, index) => {
            const returns = sum + part.exercises
            console.log(`sum: ${sum}, currentValue: ${part.exercises}, index: ${index}`)
            return returns
        })
        console.log(ex) */
    const total = parts.reduce((sum, part) => (
        sum + part.exercises
    ), 0)
    return (
        <strong>total of {total} exercises</strong>
    )
}

export default Course