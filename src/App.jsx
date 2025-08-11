import Anecdote from './exercises/Anectode'
import Course from './exercises/Course'
import Phonebook from './exercises/Phonebook.jsx'
import Currency from './exercises/Currency.jsx'
import Countries from './exercises/Countries.jsx'
// eslint-disable-next-line no-unused-vars
import { courses } from './data.js'

const App = () => {
	return (
		<div>
			{/* <Anecdote />
			<Course courses={courses} />
			<Phonebook />
			<Currency /> */}
			<Countries />
		</div>
	)
}

export default App
