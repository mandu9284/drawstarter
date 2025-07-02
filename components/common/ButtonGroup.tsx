import { ReactNode } from 'react';

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

export function ButtonGroup({ children, className = '', vertical = false }: ButtonGroupProps) {
  return (
    <div 
      className={`flex ${vertical ? 'flex-col' : 'flex-col sm:flex-row'} gap-4 ${className}`}
    >
      {children}
    </div>
  );
}
