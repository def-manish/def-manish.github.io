
              // --- Custom Alert Logic ---
       const alertOverlay = document.getElementById('custom-alert-overlay');
       const alertCloseBtn = document.getElementById('alert-close-btn');

       // Show the alert when the page loads
       alertOverlay.classList.add('show');

       // Hide the alert when the close button is clicked
       alertCloseBtn.addEventListener('click', () => {
           alertOverlay.classList.remove('show');
       });
       
       // Optional: Hide the alert when clicking on the background overlay
       alertOverlay.addEventListener('click', (event) => {
           if (event.target === alertOverlay) {
               alertOverlay.classList.remove('show');
           }
       });

      // alert('Welcome to my portfolio.');
        function handleFormSubmit(event) {
            event.preventDefault();
        }
            //alert('Thank you for connecting with us!');
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenuButton.querySelector('i').classList.toggle('fa-bars');
                mobileMenuButton.querySelector('i').classList.toggle('fa-times');
            });
             const allNavLinks = document.querySelectorAll('.nav-link');
             allNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if(!mobileMenu.classList.contains('hidden')){
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.querySelector('i').classList.add('fa-bars');
                        mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    }
                });
            });

            // Typing animation
            const typeText = document.getElementById('type-text');
            const words = ['web.', 'future.', 'extraordinary.'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typeText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typeText.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
                
                const typeSpeed = isDeleting ? 100 : 200;
                setTimeout(type, typeSpeed);
            }
            type();

            // Reveal on scroll
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });
        });
          // --- Chatbot Logic ---
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

// Toggle chat window
chatBubble.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
});

// Send message on Enter key
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
        sendMessage(chatInput.value.trim());
    }
});

function addMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `chat-message ${sender}-message`;
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = text;
    
    messageContainer.appendChild(messageBubble);
    chatMessages.appendChild(messageContainer);
    
    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage(userText) {
    // Display user's message immediately
    addMessage(userText, 'user');
    const userMessageValue = chatInput.value;
    chatInput.value = ''; // Clear input field

    try {
         Send message to the Flask backend
        const response = await
        fetch('https://manish-in.onrender.com/chat', { 

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userText }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const botReply = data.reply;
        
        // Display bot's response
        addMessage(botReply, 'bot');

    } catch (error) {
    // This is the new code to show the real error
    const errorMessage = error.toString();
    addMessage(`The error is: ${errorMessage}`, 'bot'); 
  }
}


// Add an initial welcome message from the bot
addMessage("Hello! I'm Manish's portfolio agent. Ask me about his projects or skills!", 'bot');
