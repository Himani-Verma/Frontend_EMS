# Envirocare EMS - Frontend SPA

A frontend-only Single Page Application for Envirocare EMS built with React + Vite + TypeScript + Tailwind CSS + React Router.

## Features

- **Visitors Management**: Complete table with filtering, searching, sorting, and export functionality
- **Role-based Authentication**: Admin, Customer Executive, and Sales Executive roles
- **Export Capabilities**: CSV, XLSX, and PDF export with visible columns and filtered data
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Netlify Ready**: Configured for SPA deployment on Netlify

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for client-side routing
- **Zustand** for state management
- **SheetJS** for Excel export
- **jsPDF** for PDF generation
- **date-fns** for date formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Table.tsx
│   ├── SearchInput.tsx
│   ├── Select.tsx
│   ├── Dropdown.tsx
│   ├── ColumnToggle.tsx
│   ├── ExportMenu.tsx
│   ├── Pill.tsx
│   └── Icon.tsx
├── pages/              # Page components
│   ├── Home.tsx       # Visitors Management (main page)
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── DashboardAdmin.tsx
│   ├── DashboardCE.tsx
│   ├── DashboardSales.tsx
│   ├── Chatbot.tsx
│   └── NotFound.tsx
├── store/              # State management
│   └── auth.ts         # Role-based auth store
├── styles/
│   └── globals.css     # Global styles and Tailwind
├── router.tsx          # React Router configuration
└── main.tsx           # Application entry point

public/
└── mock/
    └── visitors.json   # Mock data for visitors
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

### Netlify

The project is configured for Netlify deployment with `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Simply connect your repository to Netlify and deploy. The SPA redirect configuration will handle client-side routing.

## Features Overview

### Visitors Management (Home Page)

- **Search**: Global search across name, email, phone, and organization
- **Filters**: Status filter (New, Contacted, Interested, Converted) and time period filter
- **Column Toggle**: Show/hide table columns with default visible columns
- **Sorting**: Click column headers to sort data
- **Export**: Export filtered and visible data as CSV, XLSX, or PDF
- **Responsive**: Mobile-friendly table with horizontal scrolling

### Authentication

- **Role-based Login**: Three role buttons (Admin, CE, Sales)
- **Simple Registration**: Basic form with name, email, password
- **Dashboard Placeholders**: Role-specific dashboard pages
- **State Management**: Zustand store for role management

### Export Functionality

- **CSV Export**: Comma-separated values with proper escaping
- **XLSX Export**: Excel format using SheetJS
- **PDF Export**: A4 landscape format with autoTable
- **Filtered Data**: Only exports visible columns and filtered rows
- **Professional Formatting**: Currency formatting, date formatting, status pills

## Customization

### Theme Colors

The application uses a custom color scheme defined in `tailwind.config.js`:

- Primary: `#2d4891` (blue)
- Accent: `#64aa53` (green)
- Background: `#f6f7fb` (light gray)

### Adding New Features

1. **New Pages**: Add to `src/pages/` and update `router.tsx`
2. **New Components**: Add to `src/components/` following the existing patterns
3. **New Data**: Add JSON files to `public/mock/` and fetch in components

## Development Notes

- All data is mock data from JSON files (no backend required)
- State management is minimal using Zustand
- Components are built with accessibility in mind
- TypeScript provides type safety throughout
- Tailwind CSS provides consistent styling

## License

This project is part of the Envirocare EMS system.