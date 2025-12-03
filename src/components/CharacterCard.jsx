import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  // 1. 이미지 경로 설정 logic
  // DB에 imageFile 필드가 있다면 그걸 쓰고, 없다면 이름.jpg를 찾음
  // (한글 파일명도 브라우저에서 잘 작동합니다)
  const imageUrl = character.imageFile 
    ? `/images/${character.imageFile}` 
    : `/images/${character.id}.jpg`;

  return (
    <Link 
      to={`/characters/${character.id}`} 
      className="group relative flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-indigo-500 transform hover:-translate-y-2 transition duration-300 ease-in-out"
    >
      {/* 2. 이미지 영역 (3:4 비율 고정) */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-700 relative">
        <img 
          src={imageUrl} 
          alt={`${character.name} 이미지`}
          // 이미지가 없을 경우 대체 이미지(Placeholder) 표시
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x400/374151/FFFFFF?text=No+Image';
          }}
          // object-cover: 이미지를 찌그러뜨리지 않고 영역을 꽉 채움 (중요!)
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
        />
        
        {/* 살짝 어두운 그라데이션 (텍스트 가독성용, hover시 사라짐) */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-100 group-hover:opacity-0 transition duration-300"></div>
      </div>
      
      {/* 3. 하단 이름 Bar (반투명 효과) */}
      <div className="absolute bottom-0 w-full bg-gray-900/90 backdrop-blur-sm border-t border-gray-700 py-3 px-2">
        <div className="text-center">
          <h3 className="text-white font-bold text-lg tracking-wider truncate group-hover:text-indigo-400 transition-colors">
            {character.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}