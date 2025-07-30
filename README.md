# FreshConnect - Professional Marketplace Platform

A production-ready marketplace platform connecting street food vendors with quality suppliers for fresh ingredients.

## 🚀 Features

### 💼 Business Features
- **Supplier Management**: Complete supplier registration and store management
- **Product Catalog**: Rich product listings with categories and filters  
- **Shopping Cart**: Full cart functionality with stock validation
- **Order Management**: Order placement and tracking system
- **Messaging System**: Communication between vendors and suppliers
- **Location Services**: GPS-based supplier discovery
- **Real-time Updates**: Live stock and pricing information

### 🔧 Technical Features
- **Progressive Web App (PWA)**: Offline functionality and mobile optimization
- **Error Boundaries**: Comprehensive error handling and recovery
- **Loading States**: Professional skeleton loaders and progress indicators
- **Form Validation**: Real-time validation with business rules
- **Toast Notifications**: User-friendly feedback system
- **Network Resilience**: Offline detection and retry mechanisms
- **Performance Optimized**: Code splitting and lazy loading
- **SEO Optimized**: Meta tags and structured data
- **Security**: CSP headers, XSS protection, and input sanitization

### 📱 User Experience
- **Responsive Design**: Mobile-first responsive interface
- **Accessibility**: WCAG 2.1 compliant
- **Dark Mode Support**: System preference detection
- **Search & Filters**: Advanced filtering and sorting
- **Image Optimization**: WebP support and lazy loading
- **Animation**: Smooth transitions and micro-interactions

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/UI + Tailwind CSS + Radix UI
- **State Management**: React Hooks + Context API
- **Routing**: React Router 6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: TanStack Query + Axios
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite with plugins
- **Deployment**: Netlify with edge functions

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freshconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🌐 Deployment

### Netlify Deployment (Recommended)

1. **Connect repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment variables**
   Set the following in Netlify dashboard:
   ```
   NODE_ENV=production
   VITE_API_URL=your_api_url
   VITE_GOOGLE_MAPS_API_KEY=your_key
   VITE_RAZORPAY_KEY_ID=your_key
   ```

3. **Deploy**
   - Push to main branch
   - Netlify automatically builds and deploys

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist/ folder to your hosting provider
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | Yes | - |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | No | - |
| `VITE_RAZORPAY_KEY_ID` | Razorpay payment key | No | - |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | No | `false` |
| `VITE_SENTRY_DSN` | Error reporting | No | - |

### Feature Flags

- `VITE_ENABLE_ANALYTICS`: Google Analytics tracking
- `VITE_ENABLE_ERROR_REPORTING`: Sentry error reporting  
- `VITE_ENABLE_NOTIFICATIONS`: Push notifications
- `VITE_ENABLE_OFFLINE_MODE`: Service worker caching

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/           # Component unit tests
├── integration/    # Feature integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data and mocks
```

## 🔧 Development

### Code Quality

```bash
# Lint code
npm run lint

# Format code  
npm run format

# Type check
npm run type-check

# Pre-commit hooks
npm run pre-commit
```

### Project Structure

```
src/
├��─ components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── services/      # API and business logic
├── types/         # TypeScript type definitions
└── styles/        # Global styles
```

### Component Guidelines

- Use TypeScript for all components
- Follow naming conventions (PascalCase for components)
- Include JSDoc comments for props
- Export components as default
- Co-locate tests with components

## 📊 Performance

### Optimization Features

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Service worker with cache strategies
- **CDN**: Static asset optimization
- **Compression**: Gzip/Brotli compression

### Performance Metrics

- Lighthouse Score: 95+ 
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

## 🔒 Security

### Security Features

- **CSP Headers**: Content Security Policy
- **XSS Protection**: Input sanitization
- **HTTPS Only**: Secure connections
- **Rate Limiting**: API request throttling
- **Input Validation**: Server-side validation
- **Authentication**: JWT token management

### Security Checklist

- [ ] All forms validate input
- [ ] API endpoints require authentication
- [ ] Sensitive data is encrypted
- [ ] HTTPS is enforced
- [ ] Dependencies are updated

## 📈 Monitoring

### Analytics & Monitoring

- **Google Analytics**: User behavior tracking
- **Sentry**: Error monitoring and performance
- **Lighthouse CI**: Performance monitoring
- **Netlify Analytics**: Core web vitals
- **Custom Events**: Business metrics

### Error Tracking

- Comprehensive error boundaries
- Automatic error reporting
- User feedback collection
- Performance monitoring
- Real user monitoring (RUM)

## 🚀 Production Readiness

### Checklist

- [ ] ✅ Environment variables configured
- [ ] ✅ SSL certificate installed
- [ ] ✅ CDN configured for static assets
- [ ] ✅ Error monitoring setup
- [ ] ✅ Analytics tracking enabled
- [ ] ✅ Performance optimization applied
- [ ] ✅ Security headers configured
- [ ] ✅ SEO meta tags added
- [ ] ✅ Sitemap generated
- [ ] ✅ Robots.txt configured

### Launch Requirements

1. **Domain & Hosting**
   - Custom domain configured
   - SSL certificate active
   - CDN enabled

2. **Third-party Services**
   - Payment gateway (Razorpay) integrated
   - Maps API (Google Maps) configured
   - Email service setup
   - SMS service configured

3. **Legal & Compliance**
   - Privacy policy added
   - Terms of service created
   - GDPR compliance (if applicable)
   - Data retention policies

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

### Code Standards

- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Follow semantic versioning

## 📞 Support

### Getting Help

- **Documentation**: Check this README first
- **Issues**: Create GitHub issue for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@freshconnect.com
- **Phone**: +91-9876543210

### Business Inquiries

- **Sales**: sales@freshconnect.com
- **Partnerships**: partnerships@freshconnect.com
- **Media**: media@freshconnect.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Initial production release
- ✅ Complete marketplace functionality
- ✅ Professional UI/UX
- ✅ Real-world deployment ready
- ✅ Comprehensive error handling
- ✅ Performance optimizations

---

**Built with ❤️ for the street food vendor community**

For more information, visit [freshconnect.com](https://freshconnect.com)
