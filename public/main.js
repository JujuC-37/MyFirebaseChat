class MyChat {
    constructor() {
        this.signInButton = document.getElementById('SignIn');
        this.signOutButton = document.getElementById('SignOut');
        
        this.signInButton.addEventListener('click', () => this.signIn());
        this.signOutButton.addEventListener('click', () => this.signOut());
        if(this.auth) this.toggleButtonsSign();
        
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();
    }

    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider)
                .then( () => {
                    console.log('signIn !!!');
                    this.toggleButtonsSign();
                })
                .catch( err => console.error(err) );
    }

    signOut() {      
        this.auth.signOut()
                .then( () => {
                    console.log('signOut !!!');
                    this.toggleButtonsSign();
                })
                .catch( err => console.error(err) );
        
    }

    toggleButtonsSign() {
        this.signInButton.classList.toggle("hidden");
        this.signOutButton.classList.toggle("hidden");
        
        this.nameUser = document.getElementById('nameUser');
        if(this.auth.currentUser) {
            console.log(this.auth.currentUser);
            this.nameUser.innerHTML = `<span>${this.auth.currentUser.displayName}</span>
                <img src="${this.auth.currentUser.photoURL}" alt="photo">`;
        }
        else {
            console.log(this.auth.currentUser);
            this.nameUser.innerHTML = '';
        }
    }
}

let myChat = new MyChat();