import React, { useState, useEffect } from 'react';

const images = [
  'https://picsum.photos/id/1018/1200/400',
  'https://picsum.photos/id/1015/1200/400',
  'https://picsum.photos/id/1019/1200/400',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-md mb-8 group">
      {/* 슬라이드 이미지 영역 */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* 왼쪽 버튼 */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        &#10094;
      </button>
      
      {/* 오른쪽 버튼 */}
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
      >
        &#10095;
      </button>

      {/* 하단 인디케이터 (점) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
              currentIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
