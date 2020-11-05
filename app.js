const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const noteForm = document.getElementById('noteForm');

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

noteForm.onsubmit = (e) => {
    e.preventDefault();

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const title = titleInput.value;
    const text = textInput.value;
    
    notes.push ({
        title: title,
        text: text,
        id: generateId(),
        createdAt: Date.now()
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(notes);
    noteForm.reset();


}
