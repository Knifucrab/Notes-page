const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const categoryInput = document.getElementById('categoryInput');
const noteForm = document.getElementById('noteForm');
const notesAlmacenator = document.getElementById('notesAlmacenator');
const formEdit = document.getElementById('formEdit');
const editedTitle = document.getElementById('editedTitle');
const editedText = document.getElementById('editedText');
const editedCategory = document.getElementById('editedCategory');
let editUserId = '';


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

// function getModal(note) {
//     const createdAt = new Date(note.createdAt)
//     return `
//     <!-- Modal -->
//     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  >
//       <div class="modal-dialog" role="document" >
//         <div class="modal-content text-white" style=background-color:#202124;" >
//           <div class="modal-header" >
//             <h5 class="modal-title text-black" id="exampleModalLabel">Edita tu nota</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div class="modal-body">
//             <form action="" class="d-flex flex-column">
//                 <label for="">Titulo</label>
//                 <input type="text" class="w-50 border border-secondary text-white rounded" style="background-color: transparent;">
//                 <label for="">Contenido</label>
//                 <textarea name="" id="" cols="50" rows="10" class="w-75 border border-secondary text-white rounded" style="background-color: transparent; resize: none;" maxlength="500"></textarea>
//             </form>
//           </div>
//           <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
//             <button type="button" class="btn btn-primary">Guardar</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     `
// }

function displayNote() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const rows = []
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const card = `
        <div class="col-4 p-2">
        <div class="card borer border-secondary rounded" style="width: 18rem; background: #202124; width: 85%">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${note.category}</h6>
                <p class="card-text">${note.text}</p>
                <button class="btn btn-danger text-white" onclick="deleteNote('${note.id}')"><i
                    class="fas fa-trash-alt"></i></button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onclick="loadForm('${note.id}')"><i class="fas fa-pencil-alt"></i></button>
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

const loadForm = (noteId) => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const note = notes.find(u => u.id === noteId);
  editedTitle.value = note.title;
  editedText.value = note.title;
  editedCategory.value = note.category;
  editNoteId = noteId;
}

formEdit.onsubmit = (e) => {
  e.preventDefault()
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const title = editedTitle.value;
  const text = editedText.value;
  const category = editedCategory.value;
  const updatedAt = Date.now();
  
  const updatedNotes = notes.map((n) => {
    if (n.id === editNoteId) {
      const notes = {
        ...n,
        title,
        text,
        category,
        updatedAt,
      }
      return notes;
    } else {
      return n;
    }
  });

  const notesJson = JSON.stringify(updatedNotes);
  localStorage.setItem('notes', notesJson);
  formEdit.reset();
  displayNote();
  $('#editModal').modal('hide')
}