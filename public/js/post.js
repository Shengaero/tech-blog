const createCommentModalButton = document.getElementById('createCommentModalButton');
const inputContent = document.getElementById('inputContent');

createCommentModalButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = document.querySelector('[data-id]').getAttribute('data-id');
    const content = inputContent.value.trim();

    const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create comment!');
    }
});
