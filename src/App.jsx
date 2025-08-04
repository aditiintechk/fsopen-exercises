import Anecdote from './exercises/Anectode'
import Course from './exercises/Course'
import { courses } from './data.js'

const App = () => {
	return (
		<div>
			<Anecdote />
			<Course courses={courses} />
		</div>
	)
}

export default App
