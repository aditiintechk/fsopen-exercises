const Header = ({ name }) => {
	return <h1>{name}</h1>
}

const Content = ({ parts }) => {
	const showParts = parts.map((part) => <Part key={part.id} part={part} />)
	const total = parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<div>
			{showParts}
			<h4>total of {total} exercises</h4>
		</div>
	)
}

const Part = ({ part }) => {
	const { name, exercises } = part
	return (
		<p>
			{name} {exercises}
		</p>
	)
}

const Course = ({ courses }) => {
	const [course1, course2] = courses
	return (
		<div>
			<div key={course1.id}>
				<Header name={course1.name} />
				<Content parts={course1.parts} />
			</div>
			<div key={course2.id}>
				<Header name={course2.name} />
				<Content parts={course2.parts} />
			</div>
		</div>
	)
}

export default Course
