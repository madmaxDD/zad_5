function submitForm() {
  // Pobieranie danych z formularza
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;

  // Walidacja danych po stronie frontendu (możesz dostosować do własnych potrzeb)

  // Asynchroniczne wysłanie danych na backend
  fetch('/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, age }),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message); // Wyświetlenie komunikatu
      document.getElementById('userForm').reset(); // Wyczyszczenie formularza
      window.location.href = '/list.html';
  })
  .catch(error => console.error('Błąd:', error));
}
