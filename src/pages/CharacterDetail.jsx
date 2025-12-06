import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCharacterDetail } from '../api/characterApi.js'

// --- (이전과 동일한 헬퍼 함수들: renderRatingBars, renderTags) ---
const renderRatingBars = (rating, maxRating = 5) => {
  // ... (이전 코드 그대로 사용)
  return (
    <div className="flex space-x-1 items-center" title={`Rating: ${rating} / ${maxRating}`}>
      {[...Array(maxRating)].map((_, i) => (
        <div key={i} className={`h-2.5 w-8 rounded-full transition-all duration-300 ${i < rating ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-gray-700'}`} />
      ))}
      <span className="ml-2 text-gray-400 text-sm font-mono">{rating}/{maxRating}</span>
    </div>
  )
}

const renderTags = (items, colorClass) => {
  if (!items || (Array.isArray(items) && items.length === 0)) return <span className="text-gray-500">-</span>;
  const list = Array.isArray(items) ? items : [items];
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {list.map((item, idx) => (
        <span key={idx} className={`px-3 py-1 text-sm font-bold rounded-md shadow-sm border ${colorClass} hover:opacity-80 transition`}>{item}</span>
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

  if (isLoading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (isError) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500">Error: {error.message}</div>;
  
  // [중요] 이미지 경로 생성 (Card와 동일한 로직)
  const imageFilename = character.imageFile || `${character.name}.jpg`;
  const imageUrl = `/images/${imageFilename}`;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 md:p-8">
      
      {/* 메인 컨테이너 */}
      <div className="max-w-6xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-800 flex flex-col-reverse md:flex-row relative">
        
        {/* [왼쪽] 정보 영역 */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-gray-900 text-white z-20 relative">
          
          {/* 헤더 및 스펙 정보 (이전과 동일) */}
          <div className="mb-8 border-b border-gray-800 pb-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 tracking-tight drop-shadow-lg">
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
              {renderTags(character.roll, "bg-indigo-950 text-indigo-300 border-indigo-800")}
            </div>
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Weapon Type</h3>
              {renderTags(character.weapon, "bg-rose-950 text-rose-300 border-rose-800")}
            </div>
          </div>

          <div className="mb-10">
             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Character Summary</h3>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 leading-relaxed text-gray-300 shadow-inner">
              <p className="whitespace-pre-wrap">{character.summary}</p>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-4 mt-auto pt-4">
            <Link to="/" className="flex-1 text-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition duration-200 border border-gray-700">
              ← Back
            </Link>
          </div>
        </div>

        {/* [오른쪽] 대형 이미지 영역 (로컬 이미지 적용) */}
        {/* 모바일에서는 높이 400px, PC에서는 꽉 채움 */}
        <div className="w-full md:w-[45%] h-[400px] md:h-auto bg-gray-900 relative overflow-hidden z-10 md:absolute md:right-0 md:inset-y-0">
            <img 
              src={imageUrl}
              // 안전장치: 이미지 없으면 placeholder 표시
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/800x1000/111827/374151?text=${character.name}`;
              }}
              alt={character.name}
              // object-cover로 영역을 꽉 채우고, PC에서는 왼쪽 정보영역과 자연스럽게 겹치도록 배치
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-1000 ease-out md:object-[center_top]"
            />
            
            {/* 이미지 합성 그라데이션 (중요!) */}
            {/* 모바일: 아래에서 위로 어두워짐 */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent md:hidden"></div>
            {/* PC: 왼쪽에서 오른쪽으로, 그리고 전체적으로 살짝 어둡게 눌러줌 */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
             <div className="absolute inset-0 bg-gray-900/20 mix-blend-multiply pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
};

export default CharacterDetail;