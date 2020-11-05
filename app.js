const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const noteForm = document.getElementById('noteForm');
const categoryInput = document.getElementById('categoryInput')
const notesAlmacenator = document.getElementById('notesAlmacenator')

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

noteForm.onsubmit = (e) => {
    e.preventDefault();

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const title = titleInput.value;
    const text = textInput.value;
    const category = categoryInput.value;

    notes.push({
        title: title,
        text: text,
        id: generateId(),
        category: category,
        createdAt: Date.now()
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(notes);
    noteForm.reset();

    displayNote()
}
function displayNote() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const rows = []
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const card = `
        <div class="col-4 p-2">
            <div class="card w-100" style="width: 18rem; background: #191b1de5">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${note.category}</h6>
                    <p class="card-text">${note.text}</p>
                    <button class="btn btn-danger text-white" onclick="deleteNote('${note.id}')"><i
                        class="fas fa-trash-alt"></i></button>
                    <button class="btn btn-warning text-white"><i class="fas fa-pencil-alt"></i></button>
                </div>
            </div>
        </div>
                `
        rows.push(card)
    }
    notesAlmacenator.innerHTML = rows.join('')
}

displayNote()

function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter((notes) => notes.id !== noteId);
    const notesJson = JSON.stringify(filteredNotes);
    localStorage.setItem('notes', notesJson);
    displayNote();
}