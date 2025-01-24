const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Modele
const User = require('./models/User');
const Book = require('./models/Book');

// Middleware do weryfikacji tokenów
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Oczekiwany token w nagłówku Authorization
    if (!token) {
        return res.status(403).json({ error: 'Brak tokenu' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Weryfikacja tokenu z użyciem klucza
        req.user = decoded; // Przechowaj dane użytkownika w obiekcie req
        next(); // Kontynuuj do następnej funkcji middleware lub trasy
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
};

// Inicjalizacja aplikacji
const app = express();
app.use(cors());
app.use(express.json());

// Połączenie z MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.error('Błąd połączenia z MongoDB:', err));

// Trasy
app.get('/', (req, res) => {
    res.send('API działa');
});

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Nazwa użytkownika jest zajęta' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas rejestracji' });
    }
});

// Logowanie użytkownika
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Nieprawidłowe hasło' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas logowania' });
    }
});

// Pobieranie wszystkich książek
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania książek' });
    }
});

// Dodawanie książki (tylko dla zalogowanych użytkowników)
app.post('/books', verifyToken, async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ error: 'Błąd podczas dodawania książki' });
    }
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
