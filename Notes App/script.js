const add = document.querySelector(".add");
const notesFromLS = JSON.parse(localStorage.getItem("notes"));

if (notesFromLS) {
  notesFromLS.forEach((note) => {
    addNewNote(note);
  });
}

function addNewNote(note = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = ` 
  <div class="notes">
    <div class="tools">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  <div class="main ${notesFromLS ? "" : "hidden"}"></div>
  <textarea class = "${notesFromLS ? "hidden" : ""}"></textarea>
</div>`;

  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = note;
  main.innerHTML = marked(note);
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  delBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

add.addEventListener("click", () => {
  addNewNote();
});

function updateLS() {
  const allNotes = document.querySelectorAll("textarea");

  const notesAr = [];

  allNotes.forEach((note) => {
    notesAr.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notesAr));
}
