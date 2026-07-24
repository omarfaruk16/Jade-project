const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1); // Trust proxy headers from Nginx
const PORT = process.env.PORT || 5001;

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow images to be served to different origins
}));

// CORS: allow only the frontend origin (set FRONTEND_URL in .env)
const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || 'http://localhost:3001').split(',');
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());

// Rate Limiting — 200 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
  // Don't rate limit the health check or the development environment.
  // NOTE: the limiter is mounted at '/api/', so Express strips that prefix and
  // req.path is '/health' here — match against req.originalUrl for the full path.
  skip: (req) => process.env.NODE_ENV === 'development' || req.originalUrl.startsWith('/api/health'),
});
app.use('/api/', limiter);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

// Storage: use Cloudinary if CLOUDINARY_URL is valid, otherwise fallback to local disk
let storage;

const cloudinaryUrl = process.env.CLOUDINARY_URL || '';
const hasCloudinary = cloudinaryUrl.startsWith('cloudinary://') && cloudinaryUrl.length > 30;

if (hasCloudinary) {
  const cloudinary = require('cloudinary').v2;
  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  // Cloudinary SDK auto-reads CLOUDINARY_URL from env
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'jade',
      allowed_formats: ['avif','jpg', 'jpeg', 'png', 'webp', 'gif'],
    },
  });
  console.log('Using Cloudinary storage');
} else {
  // Fallback: local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  console.log('Using local disk storage for uploads');
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Only images (jpeg, jpg, png, webp, gif) are allowed'));
  }
});

const auth = require('./middleware/auth');

// Upload Endpoint (Protected) - with error handling
app.post('/api/upload', auth, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      const msg = err?.message || JSON.stringify(err) || 'Upload failed';
      console.error('Upload error:', msg);
      return res.status(400).json({ error: msg });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      let url;
      if (hasCloudinary && req.file.path && req.file.path.startsWith('http')) {
        // Cloudinary returns a full URL in req.file.path
        url = req.file.path;
      } else {
        // Local disk: build URL from BASE_URL + filename
        const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
        url = `${baseUrl}/uploads/${req.file.filename}`;
      }
      console.log('Upload success:', url);
      res.json({ url });
    } catch (error) {
      console.error('Upload endpoint error:', error?.message || error);
      res.status(500).json({ error: 'Failed to process upload' });
    }
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Jade API' });
});

// ── Routes ──────────────────────────────────────────────────────────────────
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const teamRoutes = require('./routes/teamRoutes');
const faqRoutes = require('./routes/faqRoutes');
const contactRoutes = require('./routes/contactRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const dealerRoutes = require('./routes/dealerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/dealer', dealerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler — MUST be after all routes to catch errors from them
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err?.message || err);
  res.status(500).json({ error: err?.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
