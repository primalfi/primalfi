'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-4 z-50
                w-10 h-10
                flex items-center justify-center
                rounded-[10px]
                border border-cyan-200
                shadow-xl
                bg-transparent text-cyan-200
                text-2xl
                cursor-pointer
                transition-all duration-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}
            `}
        >
            <FaArrowUp size={20} />
        </button>
    );
};

export default ScrollToTopButton;