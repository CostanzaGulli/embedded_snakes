
import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDyjYPyvuttJ3IHPhmuY4ygNnGCxB0zgAQ",
    authDomain: "embedded-snakes.firebaseapp.com",
    databaseURL: "https://embedded-snakes.firebaseio.com",
    projectId: "embedded-snakes",
    storageBucket: "embedded-snakes.appspot.com",
    messagingSenderId: "1033037649596",
};
 
class Firebase {
    constructor(){
        app.initializeApp(config)

        this.db = app.database();
    }

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    message = uid => this.db.ref(`messages/${uid}`);
    messages = () => this.db.ref('messages');
}
export default Firebase;