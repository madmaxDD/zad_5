// Funkcja do pobierania i wyświetlania danych
function fetchData() {
  fetch('/users')
  .then(response => response.json())
  .then(data => {
      const table = document.getElementById('usersTable');
      // Czyszczenie tabeli przed aktualizacją
      table.innerHTML = '';

      // Tworzenie nagłówka tabeli
      const headerRow = table.insertRow(0);
      const headers = ['ID', 'Imię', 'Email', 'Wiek', 'Akcje'];

      headers.forEach(headerText => {
          const th = document.createElement('th');
          const text = document.createTextNode(headerText);
          th.appendChild(text);
          headerRow.appendChild(th);
      });

      // Wypełnianie tabeli danymi
      data.forEach(user => {
          const row = table.insertRow(-1);
          const cellId = row.insertCell(0);
          const cellName = row.insertCell(1);
          const cellEmail = row.insertCell(2);
          const cellAge = row.insertCell(3);
          const cellActions = row.insertCell(4);

          cellId.innerHTML = user.id;
          cellName.innerHTML = user.name;
          cellEmail.innerHTML = user.email;
          cellAge.innerHTML = user.age;

          // Dodanie przycisku usuwania
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Usuń';
          deleteButton.onclick = function() {
              deleteUser(user.id);
          };
          cellActions.appendChild(deleteButton);
      });
  })
  .catch(error => console.error('Błąd:', error));
}

// Funkcja do usuwania użytkownika
function deleteUser(userId) {
  fetch(`/users/${userId}`, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message); // Wyświetlenie komunikatu
      fetchData(); // Ponowne pobranie i wyświetlenie danych po usunięciu
  })
  .catch(error => console.error('Błąd:', error));
}

// Pobranie i wyświetlenie danych przy załadowaniu strony
document.addEventListener('DOMContentLoaded', fetchData);
