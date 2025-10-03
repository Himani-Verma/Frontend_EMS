import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Icon } from './Icon';

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface ColumnToggleProps {
  columns: Column[];
  onToggle: (key: string) => void;
  onReset: () => void;
}

export const ColumnToggle: React.FC<ColumnToggleProps> = ({
  columns,
  onToggle,
  onReset
}) => {
  const visibleCount = columns.filter(col => col.visible).length;

  return (
    <Dropdown
      trigger={
        <span className="flex items-center space-x-1 text-sm font-medium text-slate-700">
          <Icon name="columns" className="h-4 w-4" />
          <span>Show Columns ({visibleCount})</span>
        </span>
      }
    >
      <div className="p-2">
        <div className="space-y-2">
          {columns.map((column) => (
            <label key={column.key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={column.visible}
                onChange={() => onToggle(column.key)}
                className="rounded border-slate-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-slate-700">{column.label}</span>
            </label>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-slate-200">
          <button
            onClick={onReset}
            className="w-full text-left text-sm text-slate-600 hover:text-slate-800"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </Dropdown>
  );
};
