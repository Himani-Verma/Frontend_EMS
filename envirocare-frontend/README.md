# Envirocare EMS - Frontend
A modern, responsive frontend application for the Envirocare EMS (Environmental Management System) built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Interactive Chatbot Widget**: AI-powered chatbot with rule-based responses
- **Visitor Management**: Comprehensive visitor tracking and pipeline management
- **Role-based Dashboards**: Admin, Executive, and Customer Executive dashboards
- **Analytics & Reporting**: Data visualization with charts and metrics
- **Responsive Design**: Mobile-first, modern UI/UX

### Pages & Components
- **Home Page**: Visitor management interface with filtering and export
- **Authentication**: Login and registration pages
- **Dashboard Pages**: Role-based access control
  - Admin Dashboard: Full system management
  - Executive Dashboard: Sales executive interface
  - Customer Executive Dashboard: Customer service interface
- **Chatbot Interface**: Interactive AI assistant
- **Reusable Components**: Modular, maintainable component architecture

## 🛠️ Tech Stack

### Frontend Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API communication
- **Recharts** - Data visualization and charts
- **Headless UI** - Accessible UI components

### Key Dependencies
```json
{
  "@headlessui/react": "^2.2.7",
  "@heroicons/react": "^2.2.0",
  "axios": "^1.11.0",
  "chart.js": "^4.5.0",
  "next": "15.5.0",
  "react": "19.1.0",
  "react-chartjs-2": "^5.3.0",
  "react-dom": "19.1.0",
  "react-hook-form": "^7.62.0",
  "recharts": "^3.1.2"
}
```

## 📁 Project Structure

```
frontend-only/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx           # Home page
│   │   ├── 📄 globals.css        # Global styles
│   │   ├── 📁 login/             # Login page
│   │   ├── 📁 register/          # Registration page
│   │   ├── 📁 chatbot/           # Chatbot interface
│   │   └── 📁 dashboard/         # Dashboard pages
│   │       ├── 📁 admin/         # Admin dashboard
│   │       ├── 📁 executive/     # Executive dashboard
│   │       └── 📁 customer-executive/ # Customer executive dashboard
│   ├── 📁 components/            # Reusable React components
│   │   ├── 📄 ChatbotWidget.tsx  # Main chatbot component
│   │   ├── 📄 Header.tsx         # Navigation header
│   │   ├── 📄 Sidebar.tsx        # Dashboard sidebar
│   │   ├── 📄 StatBox.tsx        # Statistics display
│   │   ├── 📄 DailyVisitorsChart.tsx # Analytics charts
│   │   └── 📄 PipelineFlowchart.tsx # Pipeline visualization
│   └── 📁 utils/                 # Utility functions
│       ├── 📄 serviceMapping.ts  # Service mapping utilities
│       └── 📄 searchUtils.ts     # Search functionality
├── 📁 public/                    # Static assets
│   ├── 📄 envirocare-logo.png   # Company logo
│   └── 📄 *.html                # Documentation files
├── 📄 package.json              # Dependencies and scripts
├── 📄 next.config.ts            # Next.js configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
└── 📄 README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-only
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_API_BASE=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Development with specific port
npm run dev -- -p 3001
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Professional blue and green theme
- **Typography**: Poppins font family
- **Components**: Consistent, accessible design
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects

### Key UI Components
- **Chatbot Widget**: Floating, interactive AI assistant
- **Data Tables**: Sortable, filterable visitor management
- **Charts**: Interactive analytics with Recharts
- **Forms**: Validated input with React Hook Form
- **Modals**: Pipeline tracking and status updates

## 🔌 API Integration

### Backend Communication
The frontend communicates with a backend API through:
- **Base URL**: `process.env.NEXT_PUBLIC_API_BASE`
- **Authentication**: JWT token-based
- **Endpoints**: RESTful API design
- **Error Handling**: Graceful fallbacks

### Key API Endpoints
- `/api/auth/*` - Authentication
- `/api/visitors/*` - Visitor management
- `/api/chat/*` - Chat functionality
- `/api/analytics/*` - Dashboard data
- `/api/faqs/*` - FAQ management
- `/api/articles/*` - Article management

## 🎯 Key Features

### 1. Visitor Management
- **Pipeline Tracking**: 18-stage visitor journey
- **Filtering**: Search, status, time period filters
- **Export**: CSV export functionality
- **Real-time Updates**: Live data refresh

### 2. Chatbot Integration
- **Rule-based AI**: Intelligent responses
- **Visitor Registration**: Pre-chat data collection
- **FAQ System**: Searchable knowledge base
- **Article Library**: Educational content

### 3. Role-based Access
- **Admin**: Full system access
- **Executive**: Sales pipeline management
- **Customer Executive**: Customer service focus

### 4. Analytics Dashboard
- **Charts**: Visitor trends, conversion rates
- **Metrics**: Key performance indicators
- **Reports**: Exportable analytics
- **Real-time Data**: Live updates

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE=https://your-api-domain.com
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js
- **Netlify**: Static site hosting
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔧 Configuration

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@envirocarelabs.com
- **Phone**: +1-555-0123
- **Hours**: Monday-Friday, 9AM-6PM EST

## 🔄 Version History

- **v1.0.0**: Initial frontend-only release
- **v1.1.0**: Enhanced chatbot integration
- **v1.2.0**: Improved analytics and reporting
- **Future**: Advanced AI features, mobile app

---

**Built with ❤️ for Envirocare Labs**
