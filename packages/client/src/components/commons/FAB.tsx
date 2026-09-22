import React, { useEffect, useState } from 'react';

const FAB: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 초기화
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 최상단으로 부드럽게 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 다크모드 토글
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-row gap-3 z-50">
      {/* 최상단 이동 버튼 */}
      <div
        className={`transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#0071e3] text-white shadow-lg flex items-center justify-center hover:bg-[#005bb5] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Scroll to Top"
        >
          <i className="fas fa-arrow-up text-xl"></i>
        </button>
      </div>

      {/* 다크모드 토글 버튼 */}
      <button
        type="button"
        onClick={toggleDarkMode}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-yellow-400 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <i className="fas fa-sun text-xl"></i>
        ) : (
          <i className="fas fa-moon text-xl"></i>
        )}
      </button>
    </div>
  );
};

export default FAB;
