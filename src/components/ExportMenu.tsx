import { Dropdown } from './Dropdown';
import { Icon } from './Icon';
import { Button } from './Button';

interface ExportMenuProps {
  onExportCSV: () => void;
  onExportXLSX: () => void;
  onExportPDF: () => void;
  onResetFilters: () => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  onExportCSV,
  onExportXLSX,
  onExportPDF,
  onResetFilters
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Dropdown
        trigger={
          <Button>
            Export
            <Icon name="chevronDown" className="h-4 w-4 ml-1" />
          </Button>
        }
      >
        <div className="p-1">
          <button
            onClick={onExportCSV}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Export as CSV
          </button>
          <button
            onClick={onExportXLSX}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Export as XLSX
          </button>
          <button
            onClick={onExportPDF}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Export as PDF
          </button>
        </div>
      </Dropdown>
      
      <button
        onClick={onResetFilters}
        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        title="Reset filters"
      >
        <Icon name="reset" className="h-4 w-4" />
      </button>
    </div>
  );
};
