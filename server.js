const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Przechowywanie danych w globalnej zmiennej
const usersData = [];

// Middleware do obsługi danych w formie JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serwowanie statycznych plików
app.use(express.static('public'));

// Endpoint dla formularza
app.post('/users', (req, res) => {
  // Przyjęcie danych z formularza
  const { field1, field2, field3 } = req.body;

  // Walidacja danych na froncie
  if (!field1 || !field2 || !field3) {
    return res.status(400).send('Wszystkie pola formularza są wymagane.');
  }

  // Dodatkowa walidacja na backendzie (możesz dostosować do własnych wymagań)
  // Przykładowa warunek: pola field2 muszą mieć co najmniej 5 znaków
  if (field2.length < 5) {
    return res.status(400).send('Pole field2 musi mieć co najmniej 5 znaków.');
  }

  // Zapisanie danych po stronie backendu
  usersData.push({ field1, field2, field3 });

  // Odpowiedź sukcesu
  res.status(200).send('Dane zostały pomyślnie zapisane.');
});

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
  console.log(`Aplikacja działa na http://localhost:${PORT}`);
});
