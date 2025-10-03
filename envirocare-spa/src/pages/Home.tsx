import { useState, useEffect, useMemo } from 'react';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';
import { ColumnToggle } from '../components/ColumnToggle';
import { ExportMenu } from '../components/ExportMenu';
import { Table, type TableColumn } from '../components/Table';
import { format, subDays } from 'date-fns';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Visitor {
  id: number;
  name: string;
  contactNo: string;
  email: string;
  organization: string;
  region: string;
  salesExecutive: string;
  comments: string;
  amount: number | null;
  status: 'New' | 'Contacted' | 'Interested' | 'Converted';
  createdAt: string;
}

const defaultColumns: TableColumn[] = [
  { key: 'name', label: 'Name', visible: true, sortable: true },
  { key: 'contactNo', label: 'Contact No.', visible: true, sortable: true },
  { key: 'email', label: 'Email', visible: true, sortable: true },
  { key: 'organization', label: 'Organization', visible: true, sortable: true },
  { key: 'region', label: 'Region', visible: true, sortable: true },
  { key: 'salesExecutive', label: 'Sales Executive', visible: false, sortable: true },
  { key: 'comments', label: 'Comments', visible: false, sortable: false },
  { key: 'amount', label: 'Amount', visible: false, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
  { key: 'createdAt', label: 'Created At', visible: true, sortable: true }
];

export const Home: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [columns, setColumns] = useState<TableColumn[]>(defaultColumns);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Load mock data
    fetch('/mock/visitors.json')
      .then(res => res.json())
      .then(data => {
        setVisitors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load visitors data:', err);
        setLoading(false);
      });
  }, []);

  const filteredVisitors = useMemo(() => {
    let filtered = [...visitors];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(visitor =>
        visitor.name.toLowerCase().includes(term) ||
        visitor.email.toLowerCase().includes(term) ||
        visitor.contactNo.toLowerCase().includes(term) ||
        visitor.organization.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'All Statuses') {
      filtered = filtered.filter(visitor => visitor.status === statusFilter);
    }

    // Time filter
    if (timeFilter !== 'All Time') {
      const now = new Date();
      let cutoffDate: Date;
      
      switch (timeFilter) {
        case 'Last 7 days':
          cutoffDate = subDays(now, 7);
          break;
        case 'Last 30 days':
          cutoffDate = subDays(now, 30);
          break;
        case 'Last 90 days':
          cutoffDate = subDays(now, 90);
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filtered = filtered.filter(visitor => new Date(visitor.createdAt) >= cutoffDate);
    }

    // Sort
    if (sortKey) {
      filtered.sort((a, b) => {
        const aVal = a[sortKey as keyof Visitor];
        const bVal = b[sortKey as keyof Visitor];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }

    return filtered;
  }, [visitors, searchTerm, statusFilter, timeFilter, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleColumnToggle = (key: string) => {
    setColumns(prev => prev.map(col => 
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };

  const handleResetColumns = () => {
    setColumns(defaultColumns);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Statuses');
    setTimeFilter('All Time');
  };

  const getVisibleData = () => {
    const visibleColumns = columns.filter(col => col.visible);
    return filteredVisitors.map(visitor => {
      const visibleData: any = {};
      visibleColumns.forEach(col => {
        visibleData[col.key] = visitor[col.key as keyof Visitor];
      });
      return visibleData;
    });
  };

  const handleExportCSV = () => {
    const visibleData = getVisibleData();
    const visibleColumns = columns.filter(col => col.visible);
    
    const headers = visibleColumns.map(col => col.label);
    const rows = visibleData.map((row: any) => 
      visibleColumns.map(col => row[col.key] || 'N/A')
    );
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visitors.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportXLSX = () => {
    const visibleData = getVisibleData();
    
    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors');
    XLSX.writeFile(workbook, 'visitors.xlsx');
  };

  const handleExportPDF = () => {
    const visibleData = getVisibleData();
    const visibleColumns = columns.filter(col => col.visible);
    
    const doc = new jsPDF('landscape');
    
    const headers = visibleColumns.map(col => col.label);
    const rows = visibleData.map((row: any) => 
      visibleColumns.map(col => {
        const value = row[col.key];
        if (value === null || value === undefined || value === '') return 'N/A';
        if (col.key === 'amount' && typeof value === 'number') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value);
        }
        if (col.key === 'createdAt') {
          return format(new Date(value), 'MMM dd, yyyy');
        }
        return value;
      })
    );
    
    (doc as any).autoTable({
      head: [headers],
      body: rows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [45, 72, 145] }
    });
    
    doc.text('Envirocare EMS — Visitors', 14, 10);
    doc.save('visitors.pdf');
  };

  const statusOptions = [
    { value: 'All Statuses', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Interested', label: 'Interested' },
    { value: 'Converted', label: 'Converted' }
  ];

  const timeOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Last 90 days', label: 'Last 90 days' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-96 mb-8"></div>
            <div className="card p-6">
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Visitors Management
          </h1>
          <p className="text-sm font-medium text-slate-600">
            View and manage all visitors through the pipeline
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-2">
                Search
              </label>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search visitors..."
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-600 mb-2">
                Status
              </label>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-600 mb-2">
                Time Period
              </label>
              <Select
                value={timeFilter}
                onChange={setTimeFilter}
                options={timeOptions}
              />
            </div>
            
            <div className="flex items-end space-x-2">
              <ColumnToggle
                columns={columns}
                onToggle={handleColumnToggle}
                onReset={handleResetColumns}
              />
              <ExportMenu
                onExportCSV={handleExportCSV}
                onExportXLSX={handleExportXLSX}
                onExportPDF={handleExportPDF}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <Table
            columns={columns}
            data={filteredVisitors}
            onSort={handleSort}
            sortKey={sortKey}
            sortDirection={sortDirection}
          />
        </div>
      </div>
    </div>
  );
};
