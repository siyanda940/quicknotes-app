const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const noteItem = document.createElement("li");
    noteItem.classList.add("note-card");

    const categoryClass = `category-${note.category.toLowerCase()}`;
    noteItem.classList.add(categoryClass);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = note.category;

    const date = document.createElement("small");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    noteItem.appendChild(noteText);
    noteItem.appendChild(categoryLabel);
    noteItem.appendChild(document.createElement("br"));
    noteItem.appendChild(date);
    noteItem.appendChild(document.createElement("br"));
    noteItem.appendChild(deleteButton);

    notesList.appendChild(noteItem);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  render();

  noteInput.value = "";
});
