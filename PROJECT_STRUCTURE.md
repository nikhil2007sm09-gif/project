# Hi Clothe - Project Structure

## 📁 Root Directory
```
hi-clothe/
├── frontend/                 # React frontend application
├── backend/                  # Node.js backend API
├── docs/                     # Project documentation
├── scripts/                  # Project-level scripts
├── .gitignore               # Git ignore rules
├── README.md                # Main project readme
└── docker-compose.yml       # Docker configuration (if needed)
```

## 🎨 Frontend Structure
```
frontend/
├── public/                   # Static public files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Common components (Button, Modal, etc.)
│   │   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   │   └── ui/              # UI-specific components
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   ├── admin/           # Admin pages
│   │   ├── vendor/          # Vendor pages
│   │   ├── affiliate/       # Affiliate pages
│   │   └── customer/        # Customer pages
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React context providers
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── constants/           # Application constants
│   ├── assets/              # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Backend Structure
```
backend/
├── src/
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── services/            # Business logic services
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   └── validators/          # Input validation
├── scripts/                 # Database and utility scripts
├── uploads/                 # File uploads
├── tests/                   # Test files
├── docs/                    # API documentation
├── .env.example             # Environment variables template
├── .env                     # Environment variables (gitignored)
├── package.json
└── server.js                # Entry point
```

## 📚 Documentation Structure
```
docs/
├── api/                     # API documentation
├── features/                # Feature specifications
├── setup/                   # Setup and installation guides
├── architecture/            # System architecture
├── troubleshooting/         # Common issues and solutions
└── README.md                # Documentation index
```

This structure follows industry best practices and makes the codebase more maintainable and scalable.