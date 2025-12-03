import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import CharacterList from './pages/CharacterList.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import { getCharacterList } from './api/characterApi'

function App() {
  const { data: chracters, isLoading, isError, error } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacterList
  })

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (isError) {
    return <p className="text-center mt-10">오류 발생: {error.message}</p>
  }

  return (
    <Routes>
      <Route path="/" element={<CharacterList characters={chracters} />} />
      <Route path="/characters/:id" element={<CharacterDetail characterss={chracters} />} />
    </Routes>
  )
}

export default App
