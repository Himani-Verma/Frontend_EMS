import { Pill } from './Pill';
import { Icon } from './Icon';
import { format } from 'date-fns';

export interface TableColumn {
  key: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
}

export interface TableData {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableData[];
  onSort: (key: string) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onSort,
  sortKey,
  sortDirection
}) => {
  const visibleColumns = columns.filter(col => col.visible);

  const formatValue = (value: any, key: string) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-slate-400">N/A</span>;
    }
    
    if (key === 'status') {
      return <Pill status={value} />;
    }
    
    if (key === 'createdAt') {
      return format(new Date(value), 'MMM dd, yyyy');
    }
    
    if (key === 'amount') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
    
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-slate-100' : ''
                }`}
                onClick={column.sortable ? () => onSort(column.key) : undefined}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortKey === column.key && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'chevronUp' : 'chevronDown'} 
                      className="h-3 w-3" 
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50">
              {visibleColumns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {formatValue(row[column.key], column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
