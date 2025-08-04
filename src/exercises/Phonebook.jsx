import { useState } from 'react'

const Filter = ({ search, handleSearch }) => (
	<div>
		<span>filter shown with: </span>
		<input type='text' value={search} onChange={handleSearch} />
	</div>
)

const PersonForm = ({
	newName,
	newNumber,
	setNewName,
	setNewNumber,
	handleSubmit,
}) => (
	<form onSubmit={handleSubmit}>
		<label>
			Name:{' '}
			<input
				type='text'
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
			/>
		</label>
		<br />
		<label>
			Number:{' '}
			<input
				type='text'
				value={newNumber}
				onChange={(e) => setNewNumber(e.target.value)}
			/>
		</label>
		<br />
		<button type='submit'>Add</button>
	</form>
)

const Persons = ({ persons }) => (
	<div>
		{persons.map((person) => (
			<h4 key={person.id}>
				{person.name} {person.number}
			</h4>
		))}
	</div>
)

const Phonebook = ({ phonebookData }) => {
	const [persons, setPersons] = useState(phonebookData)
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	function handleSearch(e) {
		setSearch(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		const newPersonExists = persons.find(
			(person) => person.name === newName
		)
		if (newPersonExists) {
			alert(`${newName} is already added to phonebook`)
			setNewName('')
			setNewNumber('')
		} else {
			setPersons((prev) => [
				...prev,
				{
					name: newName,
					number: newNumber,
					id: String(prev.length + 1),
				},
			])
			setNewName('')
			setNewNumber('')
		}
	}

	// recall derived state approach!
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleSearch={handleSearch} />
			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
				handleSubmit={handleSubmit}
			/>
			{/* recall did a mistake here */}
			<Persons persons={filteredPersons} />
		</div>
	)
}

export default Phonebook
