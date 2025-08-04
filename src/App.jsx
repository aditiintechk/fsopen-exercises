import Anecdote from './exercises/Anectode'
import Course from './exercises/Course'
import Phonebook from './exercises/Phonebook.jsx'
import { courses, phonebookData } from './data.js'

const App = () => {
	return (
		<div>
			<Anecdote />
			<Course courses={courses} />
			<Phonebook phonebookData={phonebookData} />
		</div>
	)
}

export default App
