/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY

const CountryDetails = ({ country }) => {
	const [weatherInfo, setWeatherInfo] = useState({})
	useEffect(() => {
		const fetchWeatherInfo = async () => {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}`
			)
			setWeatherInfo({
				temperature: (response.data.main.temp - 273.15).toFixed(2),
				wind: response.data.wind.speed,
			})
		}
		fetchWeatherInfo()
	}, [])

	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages).map((lang, index) => (
					<li key={index}>{lang}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={`${country.name.common} flag`} />
			<div>
				<p>Temperature - {weatherInfo.temperature} Celsius</p>
				<p>Wind - {weatherInfo.wind} m/s</p>
			</div>
		</div>
	)
}

const CountryList = ({ countries }) => {
	const [shownCountry, setShownCountry] = useState(null)
	const handleShow = (countryCode) => {
		setShownCountry((prev) => (prev === countryCode ? null : countryCode))
	}
	return (
		<div className='show-countries'>
			{countries.map((country) => (
				<div key={country.cca3}>
					<div className='show-country'>
						<span>{country.name.common}</span>
						<button onClick={() => handleShow(country.cca3)}>
							{shownCountry === country.cca3 ? 'Hide' : 'Show'}
						</button>
					</div>

					<div>
						{shownCountry === country.cca3 && (
							<CountryDetails country={country} />
						)}
					</div>
				</div>
			))}
		</div>
	)
}

const Countries = () => {
	const [value, setValue] = useState('')
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await axios.get(
					`https://studies.cs.helsinki.fi/restcountries/api/all`
				)
				setCountries(response.data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchCountries()
	}, [])

	useEffect(() => {
		if (!value) {
			setFilteredCountries([])
			return
		}

		if (countries.length > 0) {
			const filtered = countries.filter((country) =>
				country.name.common.toLowerCase().includes(value.toLowerCase())
			)
			setFilteredCountries(filtered)
		}
	}, [value, countries])

	const handleChange = (e) => {
		e.preventDefault()
		setValue(e.target.value)
	}

	return (
		<div>
			<h1>Find out everything about your favorite Countries!!</h1>
			<form>
				<label>find countries</label>{' '}
				<input type='text' value={value} onChange={handleChange} />
			</form>
			<div>
				{filteredCountries.length === 1 ? (
					<CountryDetails country={filteredCountries[0]} />
				) : filteredCountries.length > 1 &&
				  filteredCountries.length < 10 ? (
					<CountryList countries={filteredCountries} />
				) : filteredCountries.length >= 10 ? (
					'Too many matches. specify another filter'
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default Countries
