import { useState, useEffect } from 'react'
import { getAll, create, deletePerson, update } from '../services/persons.js'

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

const Persons = ({ persons, onDelete }) => (
	<div>
		{persons.map((person) => (
			<h4 key={person.id}>
				{person.name} {person.number}{' '}
				<button onClick={() => onDelete(person.id)}>delete</button>
			</h4>
		))}
	</div>
)

const Phonebook = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		getAll().then((response) => setPersons(response.data))
	}, [])

	function handleSearch(e) {
		setSearch(e.target.value)
	}

	function handleDelete(id) {
		const confirm = window.confirm('are you sure you wanna delete?')
		if (confirm) {
			deletePerson(id).then((response) =>
				setPersons(
					persons.filter((person) => person.id !== response.data.id)
				)
			)
		}
	}

	function handleSubmit(e) {
		e.preventDefault()
		const newPerson = persons.find((person) => person.name === newName)
		if (newPerson) {
			// update the existing record
			const updatedPerson = { ...newPerson, number: newNumber }
			// send put request
			update(newPerson.id, updatedPerson).then((response) => {
				// update the frotend with received response
				setPersons(
					persons.map((person) =>
						person.id === newPerson.id ? response.data : person
					)
				)
				setNewName('')
				setNewNumber('')
			})
		} else {
			const newData = {
				name: newName,
				number: newNumber,
				// updated the id logic
				id: String(Number(persons[persons.length - 1].id) + 1),
			}
			create(newData).then((response) => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
			})
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
			<Persons persons={filteredPersons} onDelete={handleDelete} />
		</div>
	)
}

export default Phonebook
