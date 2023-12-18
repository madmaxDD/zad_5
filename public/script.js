function submitForm() {
    // Pobranie danych z formularza
    const field1 = document.getElementById('field1').value;
    const field2 = document.getElementById('field2').value;
    const field3 = document.getElementById('field3').value;
  
    // Walidacja danych na froncie
    if (!field1 || !field2 || !field3) {
      alert('Wszystkie pola formularza są wymagane.');
      return;
    }
  
    // Przygotowanie danych do wysłania na backend
    const data = { field1, field2, field3 };
  
    // Wysłanie danych asynchronicznie na backend
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Błąd:', error));
  }
  