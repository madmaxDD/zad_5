document.addEventListener('DOMContentLoaded', () => {
    // Wysłanie asynchronicznego zapytania na backend po załadowaniu strony
    fetch('/users')
      .then(response => response.json())
      .then(data => {
        // Wyświetlenie danych w tabeli
        displayUsers(data);
      })
      .catch(error => console.error('Błąd:', error));
      const deleteButton = document.getElementById('deleteSelected');
      deleteButton.addEventListener('click', deleteSelectedUsers);
  });

  function deleteSelectedUsers() {
    const table = document.getElementById('userTable');
    const selectedRows = Array.from(table.querySelectorAll('input[type="checkbox"]:checked'));
  
    if (selectedRows.length === 0) {
      alert('Zaznacz co najmniej jeden rekord do usunięcia.');
      return;
    }
  
    const selectedIds = selectedRows.map(row => row.dataset.id);
  
    // Wysłanie asynchronicznego zapytania DELETE na backend
    fetch('/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedIds }),
    })
    .then(response => response.json())
    .then(data => {
      // Po usunięciu obiektu zaktualizuj listę danych
      displayUsers(data);
    })
    .catch(error => console.error('Błąd:', error));
  }

  // Zaktualizuj plik list-script.js

function displayUsers(users) {
  const tableBody = document.querySelector('#userTable tbody');

  // Wyczyszczenie aktualnych danych w tabeli
  tableBody.innerHTML = '';

  // Dodanie danych do tabeli
  users.forEach((user, index) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = `<input type="checkbox" data-id="${index}">`;
    cell2.textContent = user.field1;
    cell3.textContent = user.field2;
    cell4.textContent = user.field3;
  });
}

  