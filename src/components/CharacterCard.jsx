// src/components/CharacterCard.jsx

import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  // 1. [중요] 이미지 경로 생성 로직
  // MongoDB에 저장된 파일명 필드가 'imageFile'이라고 가정했습니다.
  // 만약 DB 필드명이 다르다면 character.imageFile 부분을 수정해주세요.
  // 예: character.image가 필드명이라면 -> character.image 로 변경
  const imageFilename = character.images || `${character.name}.jpg`; // 혹시 비어있으면 이름.jpg로 대체
  const imageUrl = `/images/${imageFilename}`;

  return (
    <Link 
      to={`/characters/${character.id}`} 
      className="group relative flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-indigo-500 transform hover:-translate-y-2 transition duration-300 ease-in-out"
    >
      {/* 2. 이미지 영역 (3:4 비율 포스터 고정) */}
      {/* aspect-[3/4]는 Tailwind 설정이 필요할 수 있습니다. 안 되면 h-64 등으로 고정 높이를 주세요. */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-900 relative">
        <img 
          src={imageUrl} 
          alt={`${character.name} 이미지`}
          
          // [안전장치] 파일명 오타 등으로 이미지를 못 찾으면 대체 이미지 표시
          onError={(e) => {
            e.target.onerror = null; // 무한 루프 방지
            // 엑박 대신 회색 배경에 이름만 나옴
            e.target.src = `https://placehold.co/300x400/1f2937/ffffff?text=${character.name}`;
          }}

          // [핵심 CSS] object-cover: 원본 비율 무시하고 틀에 꽉 채움 (찌그러짐 방지)
          // group-hover:scale-110: 마우스 올리면 부드럽게 확대
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition duration-700 ease-in-out" 
        />
        
        {/* 하단 검은 그라데이션 (이름 잘 보이게) */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
      </div>
      
      {/* 3. 하단 이름 Bar */}
      <div className="absolute bottom-0 w-full bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-3 px-2 z-10">
        <div className="text-center">
          <h3 className="text-white font-bold text-lg tracking-wider truncate group-hover:text-indigo-400 transition-colors drop-shadow-sm">
            {character.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}