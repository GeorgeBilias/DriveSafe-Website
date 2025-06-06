function submitName() {
    const userNameInput = document.getElementById('userNameInput').value; // Πάρε το όνομα που έχει δωθεί
    if (userNameInput === '') { // Αν δεν έχει δωθεί όνομα
        alert('Παρακαλώ εισάγετε το όνομά σας.'); // Εμφάνισε μήνυμα
        return;
    }else {
        document.getElementById('insert-username').style.display = 'none'; // Κρύψε το input για το όνομα
        document.getElementById('welcomeMessage').innerHTML = `Καλώς ήρθες, ${userNameInput}! <br> Πάτησε το κουμπί για να ξεκινήσεις το quiz.`; // Γραψε το μυνημα καλωσορισματος
        document.getElementById('welcomeMessage').style.display = 'block'; // Εμφάνισε το μήνυμα καλωσορίσματος
        document.getElementById('startQuiz').style.display = 'block'; // Εμφάνισε το κουμπί για να ξεκινήσει το quiz
        document.getElementById('userNameInput').style.display = 'none'; // Κρύψε το input για το όνομα
        document.getElementById('submitName').style.display = 'none'; // Κρύψε το κουμπί για υποβολή ονόματος
    }
}

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { // Όταν πατηθεί το κουμπί για να ξεκινησει το quiz

    document.getElementById('welcomeMessage').style.display = 'none'; // Κρύψε το μήνυμα καλωσορίσματος
    document.getElementById('startQuiz').style.display = 'none'; // Κρύψε το κουμπί για να ξεκινήσει το quiz
    document.getElementById('quiz').style.display = 'block'; // Εμφάνισε το quiz
    document.getElementById('question').style.display = 'block'; // Εμφάνισε την ερώτηση
    document.getElementById('choices').style.display = 'block'; // Εμφάνισε τις επιλογές
    document.getElementById('submit').style.display = 'block'; // Εμφάνισε το κουμπί για υποβολή απάντησης

    displayQuestion(); // Εμφάνισε την πρώτη ερώτηση
}

// Εδώ είναι οι ερωτήσεις του quiz

const questions = [
    {
        question: "Γνωρίζετε ποιο είναι το νόμιμο όριο αλκοόλ στο αίμα για τους οδηγούς στην Ελλάδα;",
        choices: [
            "Ναι, 0,50 g/L στο αίμα (ή 0,25 mg/L στον εκπνεόμενο αέρα)",
            "Ναι, 0,80 g/L στο αίμα",
            "Όχι, δεν γνωρίζω"
        ],
        correctAnswer: 0 // Η σωστή απάντηση είναι η πρώτη επιλογή
    },
    {
        question: "Ποιοι οδηγοί υπόκεινται σε αυστηρότερα όρια αλκοόλ σύμφωνα με τον Κ.Ο.Κ.;",
        choices: [
            "Όλοι οι οδηγοί έχουν το ίδιο όριο",
            "Οι επαγγελματίες και οι νέοι οδηγοί",
            "Δεν γνωρίζω"
        ],
        correctAnswer: 1 // Η σωστή απάντηση είναι η δεύτερη επιλογή
    },
    {
        question: "Ποια είναι η προσωπική σας στάση απέναντι στην οδήγηση μετά την κατανάλωση αλκοόλ;",
        choices: [
            "Δεν οδηγώ ποτέ αν έχω πιει",
            "Οδηγώ αν έχω πιει λίγο, αλλά αποφεύγω την υπερβολική κατανάλωση",
            "Δεν με επηρεάζει το αλκοόλ και οδηγώ κανονικά"
        ],
        correctAnswer: 0 // Η σωστή απάντηση είναι η πρώτη επιλογή
    },
    {
        question: "Πώς επιστρέφετε στο σπίτι όταν έχετε καταναλώσει αλκοόλ σε κοινωνικές εκδηλώσεις;",
        choices: [
            "Με ταξί ή μέσα μαζικής μεταφοράς",
            "Με φίλο που δεν έχει πιει",
            "Οδηγώ ο ίδιος/η ίδια"
        ],
        correctAnswer: [0, 1] // Η σωστή απάντηση είναι η πρώτη ή και η δεύτερη επιλογή
    },
    {
        question: "Ποια από τις παρακάτω επιλογές επηρεάζει περισσότερο την επίδραση του αλκοόλ στον οργανισμό;",
        choices: [
            "Το σωματικό βάρος",
            "Το είδος του αλκοόλ",
            "Η ηλικία και το φύλο"
        ],
        correctAnswer: 0 // Η σωστή απάντηση είναι η πρώτη επιλογή
    },
    {
        question: "Ποιο μέτρο θεωρείτε πιο αποτελεσματικό για τη μείωση των ατυχημάτων λόγω αλκοόλ;",
        choices: [
            "Αύξηση των τροχονομικών ελέγχων",
            "Αυστηρότερες ποινές",
            "Εκπαίδευση και ενημέρωση των οδηγών"
        ],
        correctAnswer: [0, 2]// Η σωστή απάντηση είναι η τρίτη επιλογή
    }
];``

function displayQuestion() { // Εμφάνισε την ερώτηση

    const questionElement = document.getElementById('question'); // Πάρε το element της ερώτησης
    const choicesElement = document.getElementById('choices'); // Πάρε το element των επιλογών
    const currentQuestion = questions[currentQuestionIndex]; // Πάρε την τρέχουσα ερώτηση

    questionElement.innerText = currentQuestion.question; // Εμφάνισε την ερώτηση
    choicesElement.innerHTML = ''; // Κάνε κενό τις επιλογές

    currentQuestion.choices.forEach((choice, index) => { // Για κάθε επιλογή
        const choiceElement = document.createElement('div'); // Δημιούργησε ένα div
        choiceElement.classList.add('choice'); // Πρόσθεσε την κλάση choice
        choiceElement.innerHTML = `<input type="radio" name="choice" value="${index}"> ${choice}`; // Εμφάνισε την επιλογή
        choicesElement.appendChild(choiceElement); // Πρόσθεσε την επιλογή στο element των επιλογών
    });
}

function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked'); // Πάρε την επιλογή που έχει επιλεγεί
    if (!selectedChoice) { // Αν δεν έχει επιλεγεί κάποια απάντηση
        alert('Παρακαλώ επιλέξτε μια απάντηση.'); // Εμφάνισε μήνυμα
        return;
    }

    const answer = parseInt(selectedChoice.value); // Πάρε την απάντηση που έχει επιλεγεί
    const correctAnswers = questions[currentQuestionIndex].correctAnswer; // Πάρε τις σωστές απαντήσεις

    // Ελέγξτε αν η απάντηση είναι σωστή
    if (Array.isArray(correctAnswers)) {
        if (correctAnswers.includes(answer)) {
            score++; // Αύξησε το σκορ αν η απάντηση είναι σωστή
        }
    } else {
        if (answer === correctAnswers) {
            score++; // Αύξησε το σκορ αν η απάντηση είναι σωστή
        }
    }

    currentQuestionIndex++; // Πήγαινε στην επόμενη ερώτηση
    if (currentQuestionIndex < questions.length) { // Αν υπάρχουν ακόμα ερωτήσεις
        displayQuestion(); // Εμφάνισε την επόμενη ερώτηση
    } else {
        displayResults(); // Εμφάνισε τα αποτελέσματα
    }
}

function displayResults() { // Εμφάνισε τα αποτελέσματα
    const resultsElement = document.getElementById('results'); // Πάρε το element των αποτελεσμάτων
    const userNameInput = document.getElementById('userNameInput').value; // Πάρε το όνομα που έχει δωθεί
    if (score === 0) { // Αν το σκορ είναι 0
        resultsElement.innerHTML = `<h3>Λυπάμαι, ${userNameInput}.<br> Δεν απάντησες σωστά σε καμία ερώτηση.</h3>`; // Εμφάνισε το μήνυμα
    }else if (score === questions.length) { // Αν το σκορ είναι ίσο με το πλήθος των ερωτήσεων
        resultsElement.innerHTML = `<h3>Συγχαρητήρια, ${userNameInput}!<br> Απάντησες σωστά σε όλες τις ερωτήσεις!</h3>`; // Εμφάνισε το μήνυμα
    } else {
        resultsElement.innerHTML = `<h3>Συγχαρητήρια, ${userNameInput}!<br> Το σκορ σου είναι ${score}/${questions.length}.</h3>`; // Εμφάνισε το μήνυμα με το σκορ
    }
    document.getElementById('question').style.display = 'none'; // Κρύψε την ερώτηση
    document.getElementById('choices').style.display = 'none'; // Κρύψε τις επιλογές
    document.getElementById('submit').style.display = 'none'; // Κρύψε το κουμπί για υποβολή απάντησης
}
const loginButton = document.getElementById('btn-login');
const signupButton = document.getElementById('btn-signup');
const modal = document.getElementById('auth-modal');
const modalContent = document.getElementById('auth-content');
const closeModal = document.getElementById('close-modal');

function openModal(content) {
    modalContent.innerHTML = content; 
    modal.style.display = 'flex'; 
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


loginButton.addEventListener('click', () => {
    const loginForm = `
        <h2>Σύνδεση</h2>
        <form id="login-form">
            <input type="text" placeholder="Όνομα Χρήστη" required><br><br>
            <input type="password" placeholder="Κωδικός" required><br><br>
            <button type="submit" class="login">Σύνδεση</button>
        </form>
    `;
    openModal(loginForm);

    
    const loginFormElement = document.getElementById('login-form');
    const logoutButton = document.getElementById('btn-logout');
    loginFormElement.addEventListener('submit', (event) => {
        event.preventDefault(); 
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block'; 
        signupButton.style.display = 'none';
        
        modal.style.display = 'none';
    });
});


signupButton.addEventListener('click', () => {
    const signupForm = `
        <h2>Εγγραφή</h2>
        <form id="signup-form">
            <input type="text" placeholder="Όνομα Χρήστη" required><br><br>
            <input type="email" placeholder="Email" required><br><br>
            <input type="password" placeholder="Κωδικός" required><br><br>
            <button type="submit" class="signup">Εγγραφή</button>
        </form>
    `;
    openModal(signupForm);

    
    const signupFormElement = document.getElementById('signup-form');
    signupFormElement.addEventListener('submit', (event) => {
        event.preventDefault(); 
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        modal.style.display = 'none'; 
    });
});
const logoutButton = document.getElementById('btn-logout');
logoutButton.addEventListener('click', () => {
    loginButton.style.display = 'block'; 
    logoutButton.style.display = 'none'; 
    signupButton.style.display = 'block'; 
}); 

document.addEventListener('DOMContentLoaded', function() {
    var accessibilityBtn = document.getElementById('accessibility-btn');

    if (localStorage.getItem('highContrast') === 'on') {
        document.body.classList.add('high-contrast');
    }
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('highContrast', 'on');
            } else {
                localStorage.setItem('highContrast', 'off');
            }
        });
    }
});