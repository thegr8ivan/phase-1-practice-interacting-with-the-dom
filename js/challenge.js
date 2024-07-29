document.addEventListener('DOMContentLoaded', () => {
    let counter = document.getElementById('counter');
    let plusButton = document.getElementById('plus');
    let minusButton = document.getElementById('minus');
    let heartButton = document.getElementById('heart');
    let pauseButton = document.getElementById('pause');
    let likesList = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentsDiv = document.getElementById('comments');
    
    let count = 0;
    let timer;
    let isPaused = false;
    let likes = {};

    function startTimer() {
        timer = setInterval(() => {
            if (!isPaused) {
                count++;
                counter.textContent = count;
            }
        }, 1000);
    }

    startTimer();

    plusButton.addEventListener('click', () => {
        count++;
        counter.textContent = count;
    });

    minusButton.addEventListener('click', () => {
        count--;
        counter.textContent = count;
    });

    heartButton.addEventListener('click', () => {
        if (likes[count]) {
            likes[count]++;
        } else {
            likes[count] = 1;
        }

        const existingLike = document.getElementById(`like-${count}`);
        if (existingLike) {
            existingLike.textContent = `${count} has been liked ${likes[count]} times`;
        } else {
            const likeItem = document.createElement('li');
            likeItem.id = `like-${count}`;
            likeItem.textContent = `${count} has been liked ${likes[count]} times`;
            likesList.appendChild(likeItem);
        }
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timer);
            pauseButton.textContent = 'resume';
        } else {
            startTimer();
            pauseButton.textContent = 'pause';
        }
        plusButton.disabled = isPaused;
        minusButton.disabled = isPaused;
        heartButton.disabled = isPaused;
    });

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value;
        if (commentText) {
            const comment = document.createElement('p');
            comment.textContent = commentText;
            commentsDiv.appendChild(comment);
            commentInput.value = '';
        }
    });
});

