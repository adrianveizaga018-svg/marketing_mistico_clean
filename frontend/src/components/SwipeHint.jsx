import React from 'react';
import { ArrowRight } from 'lucide-react';

// Indica en celular que la fila se puede deslizar hacia el costado.
const SwipeHint = ({ text = 'Desliza para ver más' }) => (
  <p className="md:hidden flex items-center justify-center gap-1.5 text-white/50 text-xs mt-3">
    {text} <ArrowRight size={13} />
  </p>
);

export default SwipeHint;
