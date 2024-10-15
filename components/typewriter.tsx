import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
interface TypeWriterProps {
    text: string;
    delay?: number;
}

const Typewriter = ({ text, delay = 10 }: TypeWriterProps) => {
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
    return <div className="whitespace-pre-wrap"><Markdown>{currentText}</Markdown></div>;
  };

export default Typewriter;