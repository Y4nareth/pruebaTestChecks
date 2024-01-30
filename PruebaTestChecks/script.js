const questions = [
    {
        question: "Elije la verdadera",
        answers: [
            { text: "Soy la tercera", correct:false},
            { text: "Soy la segunda", correct:true},
            { text: "Soy la primera", correct:false},
            { text: "Soy la tercera", correct:false}
        ]
    },
    {
        question: "¿Cuales dos son lenguajes de programación?",
        answers: [
            { text: "Python", correct:true},
            { text: "Frances", correct:false},
            { text: "Php", correct:true},
            { text: "Salmón", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const control = document.getElementById("control");
const nextButton = document.getElementById("next-btn");
const valButton = document.getElementById("validate-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = [];

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    //valButton.innerHTML = "Confirmar";
    //nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function getCorrectAnswers(currentQuestion) {
    const correctAnswers = [];
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (currentQuestion.answers[i].correct) {
            correctAnswers.push(i + 1);
            
        }
    }
    return correctAnswers;
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    correctAnswer = getCorrectAnswers(currentQuestion);
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    let innerAnswerId = 1
    currentQuestion.answers.forEach(answer => {
        const button = createCheckboxButton(answer.text, innerAnswerId)
        control.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        innerAnswerId++;
    });
    valButton.addEventListener("click", validateAnswer);
}

function createCheckboxButton(labelText, value) {
    // Create label element
    var label = document.createElement("label");
    label.classList.add("btn");
    
    // Create input element
    var input = document.createElement("input");
    input.setAttribute("required", "");
    input.classList.add("radio-dot");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "group"); //`group${value}`
    input.setAttribute("value", value);
    
    // Create span element for label text
    var span = document.createElement("span");
    span.classList.add("radio-label-text");
    span.textContent = labelText;
    
    // Append input and span elements to label
    label.appendChild(input);
    label.appendChild(span);
    
    return label;
}

function resetState(){
    while(control.firstChild){
        control.removeChild(control.firstChild);
        nextButton.style.display = "none";
    }
}


function validateAnswer(){

    nextButton.style.display = "inline";

    // Get the value of the selected radio button
    var selectedOption = document.querySelectorAll('input[name="group"]:checked');

    var answers = control.children;
        
    // Check if an option is selected
    if (selectedOption) {

        selectedOption.forEach(selected => {
            if(correctAnswer.includes(parseInt(selected.value,10))){
                answers[parseInt(selected.value,10)-1].classList.add("correct");
                score++;
            }else{
                answers[parseInt(selected.value,10)-1].classList.add("incorrect");
            }
        });

        /*
        // Check if the selected value is correct (option 2)
        if (selectedOption.value === `${correctAnswer}`) {
            answers[correctAnswer-1].classList.add("correct");
            //alert("Respuesta correcta"); // Correct answer
        } else {
            answers[correctAnswer-1].classList.add("correct");
            answers[parseInt(selectedOption.value,10)-1].classList.add("incorrect");
            //alert("Respuesta incorrecta"); // Incorrect answer
        }
        */
    } else {
        alert("Por favor seleccione una opción"); // No option selected
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(control.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuación es ${score} de ${questions.length}`;
    nextButton.innerHTML = "Repetir Test";
    nextButton.style.display = "block";
}

function handleNextQuetion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuetion();
    }else{
        startQuiz();
    }
});

startQuiz();