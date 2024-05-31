document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let step = 0;
    let userName = '';
    let userPhone = '';

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    function botReply(message) {
        setTimeout(() => {
            appendMessage('bot', message);
        }, 500);
    }
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        userInput.value = '';
        // add conversetions     
        if (step === 0) {
            userName = message;
            botReply(`Nice to meet you, ${userName}! can you please provide me your phone number , so that i can call you later?`);
            step++;
        } else if (step === 1) {
            userPhone = message;
            localStorage.setItem('userName', userName);
            localStorage.setItem('userPhone', userPhone);
            botReply(`Thank you, ${userName}. Your phone number (${userPhone}) has been saved.`);
            botReply(`Do you have any questions for me or any quries?`);
            step++;
        }
        else if (step === 2) {
            
            quaries = message;
            
            botReply(`Ok, ${userName}. Your mssage has REACHED TO ME . I will call you later. Goodbye!`);
            

            step++;
        }
    }

    sendButton.addEventListener('click', handleUserInput);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    // Initial bot message
    botReply('Hello! \n can i your name?');
});
