import React, { useEffect, useRef } from 'react';

// Khai báo global cho MathJax
declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements?: HTMLElement[]) => Promise<void>;
    };
  }
}

interface LatexRendererProps {
  content: string;
  className?: string;
  as?: 'div' | 'span' | 'p';
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className = '', as: Component = 'div' }) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current && window.MathJax) {
      // Clear previous MathJax formatting if needed (MathJax 3 handles this relatively well automatically)
      // Trigger typeset specifically on this component's children
      window.MathJax.typesetPromise([containerRef.current])
        .catch((err) => console.error('MathJax typeset failed:', err));
    }
  }, [content]);

  // Replace newlines with <br> for HTML rendering, but keep LaTeX intact
  // Note: This is a simple replacement. For complex Markdown + LaTeX, a parser is better.
  const processedContent = content.replace(/\n/g, '<br />');

  return (
    <Component 
      ref={containerRef as any}
      className={className}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default LatexRenderer;