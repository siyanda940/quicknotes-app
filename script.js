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

    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      render();
    });

    noteItem.appendChild(noteText);
    noteItem.appendChild(categoryLabel);
    noteItem.appendChild(document.createElement("br"));
    noteItem.appendChild(date);
    noteItem.appendChild(document.createElement("br"));
    noteItem.appendChild(deleteButton);

    notesList.appendChild(noteItem);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

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
