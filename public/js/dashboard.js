const createPostModalButton = document.getElementById('createPostModalButton');
const inputTitle = document.getElementById('inputTitle');
const inputContent = document.getElementById('inputContent');

createPostModalButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = inputTitle.value.trim();
    const content = inputContent.value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            content: content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        const json = await response.json();
        document.location.replace(`/posts/${json.id}`);
    } else {
        alert('Failed to create post!')
    }
});
