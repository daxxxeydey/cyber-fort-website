import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

export function GlitchText({ text, className = "", as: Component = 'h1' }: GlitchTextProps) {
  return (
    <div className="glitch-wrapper inline-block">
      <Component 
        className={`glitch ${className}`} 
        data-text={text}
      >
        {text}
      </Component>
    </div>
  );
}
