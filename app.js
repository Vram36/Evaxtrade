// Firebase Configuration (Replace with your details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign-Up Function
function signUp() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter a password:");
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("User signed up!");
            loadDashboard();
        })
        .catch(error => console.error("Error: ", error.message));
}

// Sign-In Function
function signIn() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("User signed in!");
            loadDashboard();
        })
        .catch(error => console.error("Error: ", error.message));
}

// Load Dashboard
function loadDashboard() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Buy Coin
function buyCoin() {
    const userId = auth.currentUser.uid;
    const userRef = db.collection("users").doc(userId);

    userRef.get().then(doc => {
        if (doc.exists) {
            let balance = doc.data().balance || 0;
            balance += 50; // Add 50 coins
            userRef.update({ balance });
            document.getElementById('balance').textContent = balance;
        } else {
            userRef.set({ balance: 50 });
            document.getElementById('balance').textContent = 50;
        }
    });
}

// Monitor Auth State
auth.onAuthStateChanged(user => {
    if (user) {
        loadDashboard();
        const userRef = db.collection("users").doc(user.uid);
        userRef.get().then(doc => {
            if (doc.exists) {
                document.getElementById('balance').textContent = doc.data().balance || 0;
            }
        });
    }
});
