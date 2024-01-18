const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Dane przechowywane po stronie backendu
let usersData = [];
let id=1
app.use(express.static('public'));
app.use(bodyParser.json());

// Endpoint obsługujący dodawanie nowych danych
app.post('/users', (req, res) => {
  const userData = req.body;

  // Walidacja danych po stronie frontendu
  if (!userData.name || !userData.email || !userData.age) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
  }

  // Przykładowa walidacja wieku
  if (userData.age < 18) {
    return res.status(400).json({ error: 'Wiek musi być równy lub większy niż 18.' });
  }

  // Zapisanie danych po stronie backendu
  usersData.push({...req.body, id});
  id++

  res.status(201).json({ message: 'Dane zostały dodane pomyślnie.' });
});

// Endpoint obsługujący pobieranie wszystkich danych
app.get('/users', (req, res) => {
  res.json(usersData);
});

// Endpoint obsługujący usuwanie danych
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Sprawdzenie czy obiekt o danym ID istnieje
  const userIndex = usersData.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika o podanym ID.' });
  }

  // Usunięcie obiektu z listy
  usersData.splice(userIndex, 1);

  res.json({ message: 'Użytkownik został usunięty pomyślnie.' });
});

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na http://localhost:${port}`);
});
