import { clsx } from 'clsx';

interface PillProps {
  status: 'New' | 'Contacted' | 'Interested' | 'Converted';
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ status, className }) => {
  const statusClasses = {
    New: 'bg-slate-100 text-slate-700',
    Contacted: 'bg-blue-100 text-blue-700',
    Interested: 'bg-amber-100 text-amber-700',
    Converted: 'bg-green-100 text-green-700'
  };
  
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusClasses[status],
        className
      )}
    >
      {status}
    </span>
  );
};
