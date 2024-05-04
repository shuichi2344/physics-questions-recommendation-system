const questionElement = document.getElementById("question");
const difficultyElement = document.getElementById("difficulty");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const maxQuestions = 15;
let consecutiveIncorrectAnswers = 0;
let askedQuestionIDs = []; // Array to store IDs of asked questions 
let similarQuestionsQueue = [];

const questions = [
    {
        QuestionID: 1001,
        Topics: "Physical Quantities and Units",
        Question: "What is the unit for thermodynamic temperature?",
        AnswerChoices: ["Candela", "Ampere", "Kelvin", "Mole"],
        Answer: "Kelvin",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1011, 1005, 1008],
        Similarity_Score: [0.4348479978949336, 0.4125750587571655, 0.40022626705605285]
    },
    {
        QuestionID: 1002,
        Topics: "Physical Quantities and Units",
        Question: "What is the SI unit for electric current?",
        AnswerChoices: ["Meter", "Second", "Ampere", "Kelvin"],
        Answer: "Ampere",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1005, 1008, 1006],
        Similarity_Score: [0.6337392598092007, 0.6147707983230027, 0.5387672526205786]
    },
    {
        QuestionID: 1003,
        Topics: "Physical Quantities and Units",
        Question: "What is the unit of luminous intensity?",
        AnswerChoices: ["Candela", "Volt", "Pascal", "Ohm"],
        Answer: "Candela",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1005, 1008, 1006],
        Similarity_Score: [0.29195949701912227, 0.28322085192333907, 0.24820651971733]
    },
    {
        QuestionID: 1004,
        Topics: "Physical Quantities and Units",
        Question: "What is the unit for measuring the amount of substance in chemistry?",
        AnswerChoices: ["Mole", "Newton", "Joule", "Pascal"],
        Answer: "Mole",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1007, 1005, 1008],
        Similarity_Score: [0.45954549231527986, 0.3320049757214349, 0.32206772866324546]
    },
    {
        QuestionID: 1005,
        Topics: "Physical Quantities and Units",
        Question: "What is the SI unit for force?",
        AnswerChoices: ["Volt", "Joule", "Watt", "Newton"],
        Answer: "Newton",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1008, 1006, 1002],
        Similarity_Score: [0.8317991703087544, 0.7289646075281974, 0.6337392598092007]
    },
    {
        QuestionID: 1006,
        Topics: "Physical Quantities and Units",
        Question: "What is the SI unit for frequency?",
        AnswerChoices: ["Hertz", "Watt", "Pascal", "Volt"],
        Answer: "Hertz",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1005, 1008, 1002],
        Similarity_Score: [0.7289646075281974, 0.7071459544012586, 0.5387672526205786]
    },
    {
        QuestionID: 1007,
        Topics: "Physical Quantities and Units",
        Question: "What is the unit for measuring electrical resistance?",
        AnswerChoices: ["Pascal", "Ohm", "Hertz", "Coulomb"],
        Answer: "Ohm",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1004, 1005, 1008],
        Similarity_Score: [0.45954549231527986, 0.37849411760418994, 0.36716540318196983, 0.32177308367490703, 0.31173897402808465]
    },
    {
        QuestionID: 1008,
        Topics: "Physical Quantities and Units",
        Question: "What is the SI unit for power?",
        AnswerChoices: ["Pascal", "Joule", "Watt", "Ampere"],
        Answer: "Watt",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1005, 1006, 1002],
        Similarity_Score: [0.8317991703087544, 0.7071459544012586, 0.6147707983230027]
    },
    {
        QuestionID: 1009,
        Topics: "Physical Quantities and Units",
        Question: "What is the unit for magnetic flux density?",
        AnswerChoices: ["Tesla", "Newton", "Pascal", "Ohm"],
        Answer: "Tesla",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1005, 1008, 1006],
        Similarity_Score: [0.3541800942020262, 0.34357912326317075, 0.3011027537469803]
    },
    {
        QuestionID: 1010,
        Topics: "Physical Quantities and Units",
        Question: "If a force of 50 Newtons is applied to an object with an area of 2 square meters, what is the pressure exerted on the object?",
        AnswerChoices: ["25 Pascal", "100 Pascal", "50 Pascal", "10 Pascal"],
        Answer: "25 Pascal",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1032, 1012, 1037],
        Similarity_Score: [0.47851751521725405, 0.4619721520861447, 0.34407030032688396]
    },
    {
        QuestionID: 1011,
        Topics: "Physical Quantities and Units",
        Question: "The temperature of a substance is 20 degrees Celsius. What is the temperature in Kelvin?",
        AnswerChoices: ["253 K", "293 °C", "293 K", "253 °C"],
        Answer: "293 K",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1001, 1004, 1032],
        Similarity_Score: [0.4348479978949336, 0.23005909708247674, 0.14335419950732042]
    },
    {
        QuestionID: 1012,
        Topics: "Physical Quantities and Units",
        Question: "A force of 500 Newtons is applied to move an object a distance of 10 meters. How much work is done?",
        AnswerChoices: ["50 Joules", "5000 Joules", "500 Joules", "5000 Watts"],
        Answer: "5000 Joules",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1010, 1032, 1037],
        Similarity_Score: [0.4619721520861447, 0.4368697114839673, 0.29837162233273695]
    },
    {
        QuestionID: 1013,
        Topics: "Physical Quantities and Units",
        Question: "If a wire has a resistance of 20 ohms and a current of 5 amperes flows through it, what is the voltage across the wire?",
        AnswerChoices: ["0.25 volts", "4 volts", "25 volts", "100 volts"],
        Answer: "100 volts",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1002, 1036, 1023],
        Similarity_Score: [0.16572668704138338, 0.16468372523653607, 0.1431217345213464]
    },
    {
        QuestionID: 1014,
        Topics: "Physical Quantities and Units",
        Question: "A container holds 500 milliliters of liquid. What is the volume of the liquid in liters?",
        AnswerChoices: ["0.05 liters", "5 liters", "50 liters", "0.5 liters"],
        Answer: "0.5 liters",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1015, 1019, 1012],
        Similarity_Score: [0.40747265830089985, 0.11267777171476677, 0.10983752467792451]
    },
    {
        QuestionID: 1015,
        Topics: "Physical Quantities and Units",
        Question: "If a container holds 5 liters of water, what is the volume of water in cubic meters?",
        AnswerChoices: ["0.05 cubic meters", "0.005 cubic meters", "5 cubic meters", "50 cubic meters"],
        Answer: "0.005 cubic meters",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1014, 1021, 1017],
        Similarity_Score: [0.40747265830089985, 0.3005652630827798, 0.27877476119325817]
    },
    {
        QuestionID: 1016,
        Topics: "Physical Quantities and Units",
        Question: "A car travels a distance of 150 kilometers in 2.5 hours. What is its average speed in meters per second?",
        AnswerChoices: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        Answer: "10 m/s",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1024, 1019, 1030],
        Similarity_Score: [0.41712546575858084, 0.3219169438368473, 0.28829140614512405]
    },
    {
        QuestionID: 1017,
        Topics: "Physical Quantities and Units",
        Question: "A rectangular box measures 2 meters by 3 meters by 4 meters. What is its volume in cubic centimeters?",
        AnswerChoices: ["48 cubic centimeters", "600 cubic centimeters", "24000 cubic centimeters", "120 cubic centimeters"],
        Answer: "24000 cubic centimeters",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1021, 1018, 1040],
        Similarity_Score: [0.7790651240930152, 0.3267898901934843, 0.27994608042557706]
    },
    {
        QuestionID: 1018,
        Topics: "Physical Quantities and Units",
        Question: "If the density of a substance is 2 grams per cubic centimeter and its volume is 50 cubic centimeters, what is its mass?",
        AnswerChoices: ["150 grams", "25 grams", "100 grams", "250 grams"],
        Answer: "100 grams",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1017, 1015, 1021],
        Similarity_Score: [0.3267898901934843, 0.2603998289300292, 0.23366787409350573]
    },
    {
        QuestionID: 1019,
        Topics: "Physical Quantities and Units",
        Question: "If a car consumes 10 liters of fuel to travel a distance of 100 kilometers, what is its fuel efficiency in kilometers per liter?",
        AnswerChoices: ["10 km/L", "100 km/L", "1 km/L", "0.1 km/L"],
        Answer: "10 km/L",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1016, 1027, 1030],
        Similarity_Score: [0.3219169438368473, 0.3086725368685071, 0.2986317531984725]
    },
    {
        QuestionID: 1020,
        Topics: "Physical Quantities and Units",
        Question: "What is the power of a machine that does 2000 Joules of work in 10 seconds?",
        AnswerChoices: ["20 Watts", "200 Watts", "2 Watts", "100 Watts"],
        Answer: "200 Watts",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1030, 1008, 1012],
        Similarity_Score: [0.1789508641337616, 0.1779476095382486, 0.1461280130433325]
    },
    {
        QuestionID: 1021,
        Topics: "Physical Quantities and Units",
        Question: "A box has dimensions 2 meters by 3 meters by 4 meters. What is its volume in cubic meters?",
        AnswerChoices: ["24 cubic meters", "12 cubic meters", "6 cubic meters", "10 cubic meters"],
        Answer: "24 cubic meters",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1017, 1040, 1015],
        Similarity_Score: [0.7790651240930152, 0.3293789260119091, 0.3005652630827798]
    },
    {
        QuestionID: 1022,
        Topics: "Physical Quantities and Units",
        Question: "A train accelerates from rest at a rate of 2 m/s² for 10 seconds. What is its final velocity?",
        AnswerChoices: ["25 m/s", "10 m/s", "5 m/s", "20 m/s"],
        Answer: "20 m/s",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1034, 1033, 1023],
        Similarity_Score: [0.8865034153395481, 0.17720582069128996, 0.14807667307366615]
    },
    {
        QuestionID: 1023,
        Topics: "Physical Quantities and Units",
        Question: "If an object has a mass of 5 kilograms and accelerates at 10 meters per second squared, what is the force acting on it?",
        AnswerChoices: ["5 Newtons", "50 Newtons", "10 Newtons", "500 Newtons"],
        Answer: "50 Newtons",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1010, 1016, 1032],
        Similarity_Score: [0.31680863148884647, 0.24728177320766276, 0.23930253431235304]
    },
    {
        QuestionID: 1024,
        Topics: "Physical Quantities and Units",
        Question: "If a car travels at a constant speed of 60 kilometers per hour for 3 hours, how far does it travel?",
        AnswerChoices: ["180 kilometers", "120 kilometers", "240 kilometers", "90 kilometers"],
        Answer: "180 kilometers",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1016, 1019, 1030],
        Similarity_Score: [0.41712546575858084, 0.29037543952930256, 0.26504974242926765]
    },
    {
        QuestionID: 1025,
        Topics: "Physical Quantities and Units",
        Question: "If vector A = 3i + 4j and vector B = 2i - 3j, what is the magnitude of their cross product?",
        AnswerChoices: ["10", "7", "17", "5"],
        Answer: "17",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1036, 1029, 1039],
        Similarity_Score: [0.4978759414417925, 0.4171832565869754, 0.3565107241600404]
    },
    {
        QuestionID: 1026,
        Topics: "Physical Quantities and Units",
        Question: "What is the scalar product (dot product) of two vectors A and B given that |A| = 5, |B| = 8, and the angle between them is 60 degrees?",
        AnswerChoices: ["15", "40", "10", "20"],
        Answer: "20",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1035, 1036, 1029],
        Similarity_Score: [0.4019834589467192, 0.2950786693631651, 0.22421862118496522]
    },
    {
        QuestionID: 1027,
        Topics: "Physical Quantities and Units",
        Question: "A car travels 100 kilometers north and then 50 kilometers east. What is the magnitude of its displacement from the starting point?",
        AnswerChoices: ["150 kilometers", "115 kilometers", "50 kilometers", "120 kilometers"],
        Answer: "115 kilometers",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1031, 1030, 1019],
        Similarity_Score: [0.8366839362847522, 0.7353258597674185, 0.3086725368685071]
    },
    {
        QuestionID: 1028,
        Topics: "Physical Quantities and Units",
        Question: "If a force of 50 Newtons acts in the east direction and another force of 30 Newtons acts in the south direction, what is the magnitude of their resultant force?",
        AnswerChoices: ["40 Newtons", "20 Newtons", "58.31 Newtons", "80 Newtons"],
        Answer: "58.31 Newtons",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1037, 1032, 1010],
        Similarity_Score: [0.3790773558513914, 0.29354727399987507, 0.241737487944394]
    },
    {
        QuestionID: 1029,
        Topics: "Physical Quantities and Units",
        Question: "If a vector A has components of 4i - 3j and vector B has components of -2i + 5j, what is the angle between them?",
        AnswerChoices: ["90 degrees", "45 degrees", "30 degrees", "60 degrees"],
        Answer: "90 degrees",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1036, 1039, 1025],
        Similarity_Score: [0.8592153687452802, 0.5775936597366362, 0.4171832565869754]
    },
    {
        QuestionID: 1030,
        Topics: "Physical Quantities and Units",
        Question: "What is the displacement of a car that travels 10 kilometers east and then 15 kilometers north?",
        AnswerChoices: ["17 kilometers", "25 kilometers", "13 kilometers", "8 kilometers"],
        Answer: "17 kilometers",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1027, 1031, 1019],
        Similarity_Score: [0.7353258597674185, 0.7341866108842118, 0.2986317531984725]
    },
    {
        QuestionID: 1031,
        Topics: "Physical Quantities and Units",
        Question: "A car travels 50 kilometers north, 30 kilometers east, and then 20 kilometers south. What is the total displacement from the starting point?",
        AnswerChoices: ["50 kilometers", "30 kilometers", "20 kilometers", "10 kilometers"],
        Answer: "10 kilometers",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1027, 1030, 1040],
        Similarity_Score: [0.8366839362847522, 0.7341866108842118, 0.2895528339113863]
    },
    {
        QuestionID: 1032,
        Topics: "Physical Quantities and Units",
        Question: "A force of 200 Newtons is applied to an object at an angle of 60 degrees with the horizontal. What is the horizontal component of the force?",
        AnswerChoices: ["150 N", "173.4 N", "100 N", "173.2 N"],
        Answer: "100 N",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1033, 1010, 1037],
        Similarity_Score: [0.5280165465769745, 0.47851751521725405, 0.4453588476835876]
    },
    {
        QuestionID: 1033,
        Topics: "Physical Quantities and Units",
        Question: "A plane is flying with a velocity of 250 m/s at an angle of 30 degrees with the horizontal. What is its horizontal velocity component?",
        AnswerChoices: ["216.5 m/s", "125 m/s", "175 m/s", "150 m/s"],
        Answer: "216.5 m/s",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1032, 1038, 1034],
        Similarity_Score: [0.5280165465769745, 0.32118359461959384, 0.18884178971098103]
    },
    {
        QuestionID: 1034,
        Topics: "Physical Quantities and Units",
        Question: "A car accelerates from rest at a rate of 4 m/s² for 8 seconds. What is its final velocity?",
        AnswerChoices: ["8 m/s", "16 m/s", "24 m/s", "32 m/s"],
        Answer: "32 m/s",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1022, 1033, 1024],
        Similarity_Score: [0.8865034153395481, 0.18884178971098103, 0.1475952503722397]
    },
    {
        QuestionID: 1035,
        Topics: "Physical Quantities and Units",
        Question: "What is the resultant of two vectors of magnitude 8 units and 6 units, making an angle of 120 degrees between them?",
        AnswerChoices: ["2 units", "10 units", "14 units", "7 units"],
        Answer: "10 units",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1038, 1026, 1037],
        Similarity_Score: [0.42191992487251406, 0.4019834589467192, 0.3421198092782235]
    },
    {
        QuestionID: 1036,
        Topics: "Physical Quantities and Units",
        Question: "If a vector A has components of 4i - 3j and vector B has components of -2i + 5j, what is the dot product of A and B?",
        AnswerChoices: ["26", "-26", "7", "-7"],
        Answer: "-26",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1029, 1039, 1025],
        Similarity_Score: [0.8592153687452802, 0.5619610288696323, 0.4978759414417925]
    },
    {
        QuestionID: 1037,
        Topics: "Physical Quantities and Units",
        Question: "Two forces of magnitude 5 Newtons and 12 Newtons act on an object at an angle of 60 degrees to each other. What is the magnitude of their resultant force?",
        AnswerChoices: ["13 Newtons", "7 Newtons", "17 Newtons", "20 Newtons"],
        Answer: "17 Newtons",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [1032, 1028, 1010],
        Similarity_Score: [0.4453588476835876, 0.3790773558513914, 0.34407030032688396]
    },
    {
        QuestionID: 1038,
        Topics: "Physical Quantities and Units",
        Question: "If a vector has a magnitude of 10 units and makes an angle of 60 degrees with the x-axis, what is its x-component?",
        AnswerChoices: ["5 units", "10 units", "8.66 units", "6 units"],
        Answer: "5 units",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1035, 1039, 1032],
        Similarity_Score: [0.42191992487251406, 0.39637027291939775, 0.3790534805367416]
    },
    {
        QuestionID: 1039,
        Topics: "Physical Quantities and Units",
        Question: "If a displacement vector has components (3, 4), what is its magnitude?",
        AnswerChoices: ["3 units", "7 units", "12 units", "5 units"],
        Answer: "5 units",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [1029, 1036, 1038],
        Similarity_Score: [0.5775936597366362, 0.5619610288696323, 0.39637027291939775]
    },
    {
        QuestionID: 1040,
        Topics: "Physical Quantities and Units",
        Question: "A person walks 10 meters north and then 5 meters south. What is the total distance walked by the person?",
        AnswerChoices: ["5 meters", "10 meters", "15 meters", "20 meters"],
        Answer: "15 meters",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [1021, 1031, 1017],
        Similarity_Score: [0.3293789260119091, 0.2895528339113863, 0.27994608042557706]
    }
];


function startQuiz() {
    console.log('Quiz Starting:', askedQuestionIDs);

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    difficultyElement.style.display = "inline-block";
    shuffleQuestions(questions); // Shuffle questions for randomization
    originalIncorrectQuestion = null; // Reset originalIncorrectQuestion
    similarQuestionsQueue = []; // Reset similar questions queue
    loadQuestion();

    // Reset questionsAnswered
    questionsAnswered = 0;
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    resetState();
    console.log('Loading Question:', currentQuestionIndex, askedQuestionIDs); 

    currentQuestion = questions[currentQuestionIndex];
    
    questionElement.innerHTML = currentQuestion.Question;
    difficultyElement.innerHTML = currentQuestion.Difficulty_Level;

    currentQuestion.AnswerChoices.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        
        if(answer === currentQuestion.Answer){
            button.dataset.correct = "true";
        }
        
        // Pass currentQuestion as an argument to selectAnswer
        button.addEventListener("click", (e) => selectAnswer(e, currentQuestion));
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    // Remove existing 'correct' and 'incorrect' classes
    Array.from(answerButtons.children).forEach(button => {
    button.classList.remove("correct", "incorrect");
    button.disabled = false; // Re-enable buttons
  });
}
let originalIncorrectQuestion = null; // Make this global
let similarQuestionsLoaded = false; // Flag to track if similar questions are already loaded

function selectAnswer(e, currentQuestion) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Check if the question has not been answered before
    if (!selectedBtn.classList.contains("correct") && !selectedBtn.classList.contains("incorrect")) {
        totalQuestionsAnswered++; // Increment the total questions answered

        // Highlight the selected answer
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
            // Set originalIncorrectQuestion if the selected answer is incorrect
            originalIncorrectQuestion = currentQuestion;
            // Set similar question IDs
            similarQuestionIDs = currentQuestion.Similar_Question_ID.slice(0, 3); // Get the first three similar question IDs
            shuffleQuestions(similarQuestionIDs); // Shuffle similar question IDs for randomization
        }

        // Disable all buttons
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        // Show the "Next" button
        nextButton.style.display = "block";
    }
}



let similarQuestionsDisplayed = 0; // Variable to track the number of similar questions displayed for the current incorrect question
let similarQuestionIDs = []; // Array to store the similar question IDs for the current incorrect question
let totalQuestionsAnswered = 0; // Variable to track the total number of questions answered

function nextQuestion() {
    if (originalIncorrectQuestion !== null) {
        loadSimilarQuestion(); // Call loadSimilarQuestion if there's an original incorrect question
    } else {
        handleNextButton(); // Otherwise, proceed with handling the next question as usual
    }
}


function loadSimilarQuestion() {
    // Hide the "Next" button initially
    nextButton.style.display = "none";

    // Load similar questions up to a maximum of 3 times
    if (similarQuestionsDisplayed < 3 && similarQuestionIDs.length > 0) {
        const similarQuestionID = similarQuestionIDs.shift();
        const similarQuestion = questions.find(q => q.QuestionID === similarQuestionID);

        if (similarQuestion) {
            // Display the similar question
            questionElement.innerHTML = similarQuestion.Question;
            difficultyElement.innerHTML = `Difficulty: ${similarQuestion.Difficulty_Level}`;

            // Remove existing answer buttons
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }

            // Create buttons for each answer choice
            similarQuestion.AnswerChoices.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer;
                button.classList.add("btn");

                if (answer === similarQuestion.Answer) {
                    button.dataset.correct = "true";
                } else {
                    button.dataset.correct = "false"; // Ensure all incorrect choices are marked as such
                }

                button.addEventListener("click", (e) => selectAnswer(e, similarQuestion));
                answerButtons.appendChild(button);
            });
            similarQuestionsDisplayed++;
        }
    } else {
        // If there are no more similar questions to display or the maximum limit is reached, proceed to the next question
        handleSimilarQuestionEnd();
    }
}


function handleSimilarQuestionEnd() {
    // Reset similar questions displayed count and similar question IDs
    similarQuestionsDisplayed = 0;
    similarQuestionIDs = [];
    // Reset originalIncorrectQuestion to continue the quiz normally
    originalIncorrectQuestion = null;
    // Proceed to the next question or show score if 15 questions have been answered
    if (totalQuestionsAnswered < 15) {
        handleNextButton();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${maxQuestions}!`;
    difficultyElement.style.display = "none";
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block"; // Make sure the button is displayed
}
  
// Define a variable to track the number of questions answered
let questionsAnswered = 0;

function handleNextButton() {
    const result = document.querySelector(".result");
    if (result) {
        result.remove();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < maxQuestions) {
        if (originalIncorrectQuestion !== null) {
            loadSimilarQuestion(originalIncorrectQuestion.Similar_Question_ID);
        } else {
            loadQuestion();
        }
    } else {
        showScore();
        currentQuestionIndex = 0;
        originalIncorrectQuestion = null;
        nextButton.innerHTML = "Try Again";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", handleTryAgain);
    }
}

answerButtons.addEventListener("click", function(e) {
    // Pass the event object and currentQuestion to the selectAnswer function
    selectAnswer(e, currentQuestion);
});

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    if (questionsAnswered < maxQuestions) {
        handleNextButton();
    }
});

function handleTryAgain() {
    // Reset all relevant variables and states
    originalIncorrectQuestion = null;
    similarQuestionsDisplayed = 0;
    similarQuestionIDs = [];
    totalQuestionsAnswered = 0;
    score = 0;

    // Remove the event listener for "Try Again"
    nextButton.removeEventListener("click", handleTryAgain);

    // Restart the quiz
    startQuiz();
}


startQuiz(); 