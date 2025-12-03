import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCharacterDetail } from '../api/characterApi.js'

const renderRatingBars = (rating, maxRating = 5) => {
  return (
    <div className="flex space-x-1 items-center" title={`Rating: ${rating} / ${maxRating}`}>
      {[...Array(maxRating)].map((_, i) => (
        <div 
          key={i} 
          className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
            i < rating ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-gray-700'
          }`} 
        />
      ))}
      <span className="ml-2 text-gray-400 text-sm font-mono">
        {rating}/{maxRating}
      </span>
    </div>
  )
}

const renderTags = (items, colorClass) => {
  if (!items) return <span className="text-gray-500">-</span>;
  
  const list = Array.isArray(items) ? items : [items];
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {list.map((item, idx) => (
        <span 
          key={idx} 
          className={`px-3 py-1 text-sm font-bold rounded-md shadow-sm border ${colorClass} hover:opacity-80 transition`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

const CharacterDetail = () => {
  const { id } = useParams();

  const { data: character, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterDetail(id),
    enabled: !!id,
  })

  if (isLoading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  if (isError) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">Error: {error.message}</div>;
  
  const imageUrl = character.imageFile 
    ? `/images/${character.imageFile}` 
    : `/images/${character.id}.jpg`;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 md:p-8">
      
      <div className="max-w-6xl w-full bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col-reverse md:flex-row">
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-800 text-white z-10">
          
          <div className="mb-8 border-b border-gray-700 pb-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
              {character.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-bold text-xs tracking-widest uppercase">Performance Rating</span>
              {renderRatingBars(character.rating)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Position / Roll</h3>
              {renderTags(character.roll, "bg-indigo-900/50 text-indigo-200 border-indigo-700/50")}
            </div>

            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Weapon Type</h3>
              {renderTags(character.weapon, "bg-rose-900/50 text-rose-200 border-rose-700/50")}
            </div>
          </div>

          <div className="mb-10">
             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Character Summary</h3>
            <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {character.summary}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link 
              to="/" 
              className="flex-1 text-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition duration-200"
            >
              ← Back to List
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-96 md:h-auto bg-gray-900 relative group overflow-hidden">
            <img 
              src={imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x800/111827/FFFFFF?text=No+Image';
              }}
              alt={character.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-gray-800"></div>
        </div>

      </div>
    </div>
  );
};

export default CharacterDetail;