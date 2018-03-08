class MyChat {
    constructor() {
        this.signInButton = document.getElementById('SignIn');
        this.signOutButton = document.getElementById('SignOut');
        
        this.signInButton.addEventListener('click', () => this.signIn());
        this.signOutButton.addEventListener('click', () => this.signOut());
        
        this.auth = firebase.auth();
        this.auth.onAuthStateChanged(() => {
            this.toggleButtonsSign()
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

    toggleButtonsSign() {
        this.signInButton.classList.toggle("hidden");
        this.signOutButton.classList.toggle("hidden");
        
        this.nameUser = document.getElementById('nameUser');
        if(this.auth.currentUser) {
            console.log(this.auth.currentUser);
            this.nameUser.innerHTML = `<img src="${this.auth.currentUser.photoURL}" alt="photo">
            <span>${this.auth.currentUser.displayName}</span>`;
        }
        else {
            console.log(this.auth.currentUser);
            this.nameUser.innerHTML = '';
        }
    }
}

let myChat = new MyChat();