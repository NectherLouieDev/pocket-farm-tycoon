import express from 'express';
import fs from 'fs/promises';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'database.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Helper function to read database
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// ============= SIMPLE LOGIN ROUTE =============

// LOGIN route - just checks username and password
app.post('/api/login', async (req, res) => {
  try {
    console.log("post type fetch");
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }

    const db = await readDB();

    // Find user with matching username AND password
    // In a real app, you'd hash passwords, but this is simple demo
    const user = db.users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }

    // Login successful - return user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🔐 Simple Login Server Started!
  ================================
  📍 URL: http://localhost:${PORT}
  📁 Database: database.json
  🔗 Login:  POST /api/login
  🔗 Signup: POST /api/signup
  `);
});