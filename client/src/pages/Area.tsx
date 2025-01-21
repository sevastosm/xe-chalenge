import { useState } from 'react'
import { CommandComponent } from '@/components/CommandComponent'


function Area() {

  const [suggestions, setSuggestions] = useState<string[]>( );
  const suggestionList = [
    {
    "placeId": "1ee9a256c213540330ec272a9285f47912a30169",
    "mainText": "lalallal",
    "secondaryText": "Ελλάδα"
    },
    {
    "placeId": "e06e1bd03aa97bbec29c575ff5059252a92ca84c",
    "mainText": "Nafpliou",
    "secondaryText": "Αθήνα, Ελλάδα"
    }
    ]
  const handleInputChange = async (event: any) => {
  const searchTerm = event.target.value.toLowerCase();
   const response = await  fetch(`http://localhost:3000/autocomplete?input=${searchTerm}`)
   const data = await response.json()
   setSuggestions(data.results)

    };

  return (
    <div className="flex flex-col items-center justify-center bg-red-100">
      <div className="flex flex-col items-center justify-center bg-green-100">
        <a href="https://vite.dev" target="_blank">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <h1>Vite + React</h1>
     
      <CommandComponent  onChange={handleInputChange} placeholder="Type a command or search..." suggestions={suggestions} />
    </div>
  )
}

export default Area
