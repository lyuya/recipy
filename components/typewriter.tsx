import React, { useState, useEffect } from 'react';
interface TypeWriterProps {
    text: string;
    delay: number;
}

const Typewriter = ({ text, delay }: TypeWriterProps) => {
    const [prevText, setPrevText] = useState('')
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (prevText !== text) {
            setCurrentText('')
            setCurrentIndex(0)
        }
        setPrevText(text)
    }, [text]);
  
    useEffect(() => {
        if (currentIndex < text.length) {
          const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
          }, delay);
      
          return () => clearTimeout(timeout);
        }
      }, [currentIndex, delay, text, prevText]);  
    return <span className="whitespace-pre-wrap">{currentText}</span>;
  };

export default Typewriter;