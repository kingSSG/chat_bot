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
    function phonenumber(userPhone) {
        var phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(userPhone)) {
            botReply(`please provide a valid phone number `);
            userPhone = message;
            phonenumber(userPhone);
        }
        else 
        {
            return userPhone;
        }

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
            userPhone= phonenumber(userPhone);

            localStorage.setItem('userName', userName);
            localStorage.setItem('userPhone', userPhone);
            botReply(`Thank you, ${userName}. Your phone number (${userPhone}) has been saved.`);
            botReply(`Do you have any questions for me or any quries?`);
            step++;
        }
        else if (step === 2) {
            
            quaries = message;
            
            botReply(`Ok, ${userName}. i got your massage . I will call you later. Goodbye!`);
            
            save( userName,userPhone,quaries);

            step++;
        }
    }

    sendButton.addEventListener('click', handleUserInput);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });
    function  save( userName,userPhone,quaries) {
        var name = userName; // Replace with your actual data
        var phone_no = userPhone; // Replace with your actual data
        
        var url = 'https://script.google.com/macros/s/AKfycbxuizjGuF6eBBKejLgKM8_LS9gTiJVlvLpoZXWzTOdDcB8l-QD2LGDHSBhyvo-fLW0/exec';
        
            jQuery.ajax({
            url: url,
            type: 'post',
            data: {
                name: name,
                phone_no: phone_no,
                massage: quaries
            },
            success: function(result) {
                console.log(result); // Log the result on success
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX request failed:', textStatus, errorThrown); // Log any error
            }
            });
        }

    // Initial bot message
    botReply('Hello! \n your name plese ?');
});
