import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulaProps {
  text: string;
  isBlock?: boolean;
}

const MathFormula: React.FC<MathFormulaProps> = ({ text, isBlock = false }) => {
  // Function to split text into math and non-math parts
  const renderMixedContent = (content: string) => {
    const parts = content.split(/(\\\(.*?\\\)|\\\[.*?\\\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('\\(') && part.endsWith('\\)')) {
        // Inline math: remove \( and \)
        const mathContent = part.slice(2, -2);
        return <InlineMath key={index} math={mathContent} />;
      } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
        // Block math: remove \[ and \]
        const mathContent = part.slice(2, -2);
        return <BlockMath key={index} math={mathContent} />;
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });
  };

  return <div className="math-content">{renderMixedContent(text)}</div>;
};

export default MathFormula; 