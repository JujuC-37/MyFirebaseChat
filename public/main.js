class MyChat {
    constructor() {
        this.signInButton = document.getElementById('SignIn');
        this.signOutButton = document.getElementById('SignOut');
        this.messageForm = document.getElementById('messageForm');
        this.messagesList = document.getElementById('messagesList');
        
        this.signInButton.addEventListener('click', () => this.signIn());
        this.signOutButton.addEventListener('click', () => this.signOut());
        this.messageForm.addEventListener('submit', (e) => this.addMessage(e));
        
        this.auth = firebase.auth();
        this.auth.onAuthStateChanged(() => {
            this.toggleButtonsSign();

            if(this.auth.currentUser) {
                this.loadMessage();
            }
        });
        this.database = firebase.database();
        this.storage = firebase.storage();
    }

    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider)
                .then( () => {
                    console.log('signIn !!!');
                })
                .catch( err => console.error(err) );
    }

    signOut() {      
        this.auth.signOut()
                .then( () => {
                    console.log('signOut !!!');
                })
                .catch( err => console.error(err) );
        
    }

    addMessage(e) {
        e.preventDefault();

        this.messageInput = document.getElementById('messageInput');

        if(this.messageInput.value && this.auth.currentUser) {
            this.addMessageInDOM(this.messageInput.value);
            this.addMessageInDB(this.messageInput.value);
            
            // reset value field
            this.messageInput.value = '';
        }
        else {
            alert('Connexion requise ou message vide...');
        }
    }

    toggleButtonsSign() {
        this.signInButton.classList.toggle("hidden", this.auth.currentUser ? true : false);
        this.signOutButton.classList.toggle("hidden", this.auth.currentUser ? false : true);
        
        this.nameUser = document.getElementById('nameUser');
        if(this.auth.currentUser) {
            this.nameUser.innerHTML = `<img src="${this.auth.currentUser.photoURL}" alt="photo">
            <span>${this.auth.currentUser.displayName}</span>`;
        }
        else {
            console.log(this.auth.currentUser);
            this.nameUser.innerHTML = '';
        }
    }

    loadMessage(){
        this.messagesRef = this.database.ref('messages'); // Reference to the /messages/ database path.
        this.messagesRef.off(); // Make sure we remove all previous listeners.

        let setMessage = (data) => {
            let message = data.val();
            this.addMessageInDOM(message.content);
        }

        this.messagesRef.limitToLast(4).on('child_added', setMessage);
        this.messagesRef.limitToLast(4).on('child_changed', setMessage);        
    }

    addMessageInDOM(message){
        let messageContainer = document.createElement('div');
        messageContainer.classList.add('messageContainer');
        messageContainer.innerHTML = `<div class="authName">${this.auth.currentUser.displayName}</div>
        <div class="text">${message}</div>`;

        this.messagesList.appendChild(messageContainer);
    }

    addMessageInDB(message) {
        this.messagesRef = this.database.ref('messages'); // Reference to the /messages/ database path.
        this.messagesRef.off(); // Make sure we remove all previous listeners.

        this.messagesRef.push({
            user: this.auth.currentUser.displayName,
            content: message,
        })
        console.log('in database: ', message);
    }
}

let myChat = new MyChat();