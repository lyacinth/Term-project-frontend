import { Link } from 'react-router-dom'
import CharacterCard from '../components/CharacterCard.jsx'

export default function CharacterList({ characters }) {
  return (
    <div className='p-6'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">        {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    </div>
  )
}