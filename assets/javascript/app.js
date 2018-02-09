$(document).ready(function () {

    //create correct, and incorrect variables, timeOut
    var correct = 0;
    var incorrect = 0;
    var currentQ = 0;
    var questionTime;
    var timer = 15;
    var dqTimeout;

    //questions object
    var questionArray = [
        {
            question: "Varg Vikernes (of Norwegian black metal band Burzum) was convicted of murdering _____, the guitar player of the band Mayhem.",
            answers: {
                a: "Eponymous",
                b: "Satanymous",
                c: "Euronymous",
                d: "Jeff"
            },
            correct: "c"
        },
        {
            question: "____ is the most identifiable aspect of the black metal aesthetic.",
            answers: {
                a: "Long hair",
                b: "Black boots",
                c: "Cross earings",
                d: "Corpse paint"
            },
            correct: "d"
        },
        {
            question: "Wormlust, Zhrine, and Misþyrming are all from what country?",
            answers: {
                a: "Iceland",
                b: "Finland",
                c: "Sweden",
                d: "Norway"
            },
            correct: "a"
        },
        {
            question: "Austin Lunn, the sole member of the band Panopticon, is an avid ____.",
            answers: {
                a: "photographer",
                b: "outdoors-man",
                c: "painter",
                d: "racquetball player"
            },
            correct: "b"
        },
        {
            question: "Which country is the metal music festival Roadburn held?",
            answers: {
                a: "Netherlands",
                b: "Germany",
                c: "Mexico",
                d: "United States"
            },
            correct: "a"
        }
    ];


    //start button
    $("#start").click(startQuiz);

    //quiz start/reset function
    function startQuiz() {
        currentQ = 0;
        correct = 0;
        incorrect = 0;
        //call function to display the question and answers in html
        displayQuestion();
    }

    //stats screen after quiz
    function quizEnd() {

        //display quiz stats and creates restart button
        $("#quiz").html('<h3 id="question">Behold your statistics:</h3>' + '<p>' + correct + '</p>' + '<p>' + incorrect + '</p>' + '<button type="button" class="btn btn-default btn-lg btn-block" id="restart">Click to be reborn</button>');
        
        //click handler to start quiz over
        $("#restart").click(startQuiz);
    }

    //function for correct answer
    function correctAnswer() {
        
        //increase correct variable
        correct++

        //set html to display that the choice was correct disabled buttons
        $("#quiz").html('<h3 id="question">YES! Your soul is temporarily spared!</h3>' + '<p>' + questionArray[currentQ].question + '</p>' +
            '<div id="answers">' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="a" disabled="disabled">' + questionArray[currentQ].answers.a + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="b" disabled="disabled">' + questionArray[currentQ].answers.b + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="c" disabled="disabled">' + questionArray[currentQ].answers.c + '</button>' + '<button type="button" class="btn btn-default btn-lg btn-block" id="d" disabled="disabled">' + questionArray[currentQ].answers.d + '</button>' +
            '</div>');

        //highlight the correct question
        $("#" + questionArray[currentQ].correct).attr("class", "btn btn-success btn-lg btn-block");

        //increase current question to reference the next question in the question array
        currentQ++

        //set timeout to change to the next question
        dqTimeout = setTimeout(displayQuestion, 1000 * 5);

        //checks if last question and displays quiz end
        if (currentQ === questionArray.length) {
            clearTimeout(dqTimeout);
            dqTimeout = setTimeout(quizEnd, 1000 * 5);
        }
    }

    //wrong answer function
    function wrongAnswer() {

        //increases incorrect
        incorrect++

        //sets html to show that the answer was incorrect
        $("#quiz").html('<h3 id="question">NO! Your soul is scarred black!</h3>' + '<p>' + questionArray[currentQ].question + '</p>' +
            '<div id="answers">' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="a" disabled="disabled">' + questionArray[currentQ].answers.a + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="b" disabled="disabled">' + questionArray[currentQ].answers.b + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="c" disabled="disabled">' + questionArray[currentQ].answers.c + '</button>' + '<button type="button" class="btn btn-default btn-lg btn-block" id="d" disabled="disabled">' + questionArray[currentQ].answers.d + '</button>' +
            '</div>');
        
        //shows correct answer on button
        $("#" + questionArray[currentQ].correct).attr("class", "btn btn-success btn-lg btn-block");

        //increases question in array
        currentQ++

        //timeout to go to next question
        dqTimeout = setTimeout(displayQuestion, 1000 * 5);
        
        //checks if last question for quiz end screen
        if (currentQ === questionArray.length) {
            clearTimeout(dqTimeout);
            dqTimeout = setTimeout(quizEnd, 1000 * 5);
        }
    }

    //function to display quiz question
    function displayQuestion() {

        //sets html to display question and answer buttons
        $("#quiz").html('<h3 id="question">' + questionArray[currentQ].question + '</h3>' +
            '<div id="answers">' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="a">' + questionArray[currentQ].answers.a + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="b">' + questionArray[currentQ].answers.b + '</button>' +
            '<button type="button" class="btn btn-default btn-lg btn-block" id="c">' + questionArray[currentQ].answers.c + '</button>' + '<button type="button" class="btn btn-default btn-lg btn-block" id="d">' + questionArray[currentQ].answers.d + '</button>' +
            '</div>');

        //set timeout for time alotted to answer question to the questionTime variable
        questionTime = setTimeout(wrongAnswer, 1000 * 15);

        //click handler for buttons
        $("button").click(function () {
            
            //clears timeOut 
            clearTimeout(questionTime);

            //checks if answer was correct
            if (this.id === questionArray[currentQ].correct) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
        });
    }
});