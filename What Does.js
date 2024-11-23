        let score = 0;
        const scoreDisplay = document.getElementById('score-value');

        const dialogues = [
            {
                "answer": "name",
                "question": "What's your dad's ....?",
                "options": ["play", "name", "doing"],
                "audio": "voices/dad's name.mp3",
                "options_audio": [
                    "voices/play.mp3", // صوت الخيار الأول
                    "voices/name.mp3", // صوت الخيار الثاني
                    "voices/doing.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/dad's name.png"],
                "background": "img/bg/bg2.png"
            },

            {
                "answer": "dad",
                "question": "My ....'s name is Omar.",
                "options": ["mother", "sister", "dad"],
                "audio": "voices/My ....'s name is Omar..mp3",
                "options_audio": [
                    "voices/mother.mp3", // صوت الخيار الأول
                    "voices/sister.mp3", // صوت الخيار الثاني
                    "voices/dad.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/dad's name1.png"],
                "background": "img/bg/bg2.png"
            },
            
            {
                "answer": "he",
                "question": "What does .... do?",
                "options": ["he", "it", "its"],
                "audio": "voices/What does .... do.mp3",
                "options_audio": [
                    "voices/he.mp3", // صوت الخيار الأول
                    "voices/it.mp3", // صوت الخيار الثاني
                    "voices/its.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/What does .... do.png"],
                "background": "img/bg/bg2.png"
            },

            {
                "answer": "pilot",
                "question": "He’s a ....",
                "options": ["teacher", "pilot", "doctor"],
                "audio": "voices/He’s a pilot..mp3",
                "options_audio": [
                    "voices/teacher.mp3", // صوت الخيار الأول
                    "voices/pilot.mp3", // صوت الخيار الثاني
                    "voices/doctor.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/pilot.png"],
                "background": "img/bg/bg2.png"
            },

            {
                "answer": "name",
                "question": "What's your brother's ....?",
                "options": ["play", "name", "doing"],
                "audio": "voices/What's your brother's name.mp3",
                "options_audio": [
                    "voices/play.mp3", // صوت الخيار الأول
                    "voices/name.mp3", // صوت الخيار الثاني
                    "voices/doing.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/brother.png"],
                "background": "img/bg/bg3.png"
            },

            {
                "answer": "brother",
                "question": "My ....'s name is Mohammed.",
                "options": ["brother", "sister", "mother"],
                "audio": "voices/My brother's name is Mohammed..mp3",
                "options_audio": [
                    "voices/brother.mp3", // صوت الخيار الأول
                    "voices/sister.mp3", // صوت الخيار الثاني
                    "voices/mother.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/brother's name.png"],
                "background": "img/bg/bg3.png"
            },
            
            {
                "answer": "he",
                "question": "What does .... do?",
                "options": ["he", "it", "its"],
                "audio": "voices/What does .... do.mp3",
                "options_audio": [
                    "voices/he.mp3", // صوت الخيار الأول
                    "voices/it.mp3", // صوت الخيار الثاني
                    "voices/its.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/What does .... do.png"],
                "background": "img/bg/bg3.png"
            },

            {
                "answer": "student",
                "question": "He’s a ....",
                "options": ["student", "teacher", "doctor"],
                "audio": "voices/He’s a student.mp3",
                "options_audio": [
                    "voices/student.mp3", // صوت الخيار الأول
                    "voices/teacher.mp3", // صوت الخيار الثاني
                    "voices/doctor.mp3", // صوت الخيار الثاني
                ],
                "image": ["img/student.png"],
                "background": "img/bg/bg3.png"
            },


            

        ];


        const answerButtons = document.querySelectorAll('.answer-btn');
        const questionAudio = document.getElementById('question-audio');
        const successAudio = document.getElementById('success-audio');
        const successAudio2 = document.getElementById('success-audio2');
        const wrongAudio = document.getElementById('wrong-audio');
        const gameContainer = document.getElementById('game-container');



        let originalQuestion = "";
        let currentDialogueIndex = 0;
        const listenButton = document.getElementById('listen-button');

        listenButton.addEventListener('click', playQuestionAudioTwice);

        const startButton = document.getElementById('start-button');
        const startContainer = document.getElementById('start-container');

        // حدث النقر على زر البداية
        startButton.addEventListener('click', () => {
        // إخفاء زر البداية
            startContainer.style.display = 'none';

            // عرض محتوى اللعبة
            document.getElementById('game-container').style.display = 'block';

            // بدء اللعبة
            showNextDialogue();
        });


        function stopAudio(audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }

        function playQuestionAudioTwice() {
            stopAudio(questionAudio);
            questionAudio.currentTime = 0;
            questionAudio.play();
            
            questionAudio.addEventListener('ended', playAgainOnce, { once: true });
        }

        function playAgainOnce() {
            questionAudio.currentTime = 0;
            questionAudio.play();
        }

        function showNextDialogue() {
            stopAudio(successAudio2);
            stopAudio(questionAudio);

            const currentDialogue = dialogues[currentDialogueIndex];

            // احفظ النص الأصلي للسؤال
            originalQuestion = currentDialogue.question;
            document.getElementById('question-text').textContent = originalQuestion;

            answerButtons.forEach((button, index) => {
                button.textContent = currentDialogue.options[index];
                button.onclick = () => {
                    playOptionAudio(index, currentDialogue);
                };
            });

            questionAudio.src = currentDialogue.audio;

            const questionImage = document.getElementById('question-image');
            questionImage.src = currentDialogue.image;
            document.body.style.backgroundImage = `url(${currentDialogue.background})`;
            document.body.style.backgroundSize = 'cover';
            questionImage.classList.add('fade-in');

            playQuestionAudioTwice();
        }

        function playOptionAudio(index, dialogue) {
            const optionAudio = new Audio(dialogue.options_audio[index]);
            disableButtons();

            optionAudio.play();

            optionAudio.addEventListener('ended', () => {
                checkAnswer(dialogue.options[index]);
            });
        }

        function checkAnswer(selectedAnswer) {
            const currentDialogue = dialogues[currentDialogueIndex];

            // استبدل النقاط داخل نص السؤال بالإجابة المحددة
            const updatedQuestion = originalQuestion.replace('....', selectedAnswer);
            document.getElementById('question-text').textContent = updatedQuestion;

            if (selectedAnswer === currentDialogue.answer) {
                score++;
                scoreDisplay.textContent = score;
                createConfetti();

                const correctAnswerAudio = new Audio(currentDialogue.answer_audio);
                correctAnswerAudio.play();

                
                successAudio.play();
                
                successAudio2.play();

                currentDialogueIndex++;
                if (currentDialogueIndex < dialogues.length) {
                    setTimeout(() => {
                        showNextDialogue();
                        setTimeout(enableButtons, 500);
                    }, 3000);
                } else {
                    setTimeout(transitionToNextPage, 2000);
                }
            } else {
                wrongAudio.play();
                
                wrongAudio.addEventListener('ended', () => {
                    setTimeout(playQuestionAudioTwice, 1000);
                    enableButtons();
                    document.getElementById('question-text').textContent = originalQuestion; // إعادة السؤال الأصلي
                }, { once: true });
            }
        }

        function disableButtons() {
            answerButtons.forEach(button => button.disabled = true);
        }

        function enableButtons() {
            answerButtons.forEach(button => button.disabled = false);
        }

        function transitionToNextPage() {
            gameContainer.classList.add('stage-transition');
            setTimeout(() => {
                window.location.href = 'Mark.html';
            }, 2000);
        }

        showNextDialogue();

        function createConfetti() {
            const confettiContainer = document.getElementById('confetti');
            confettiContainer.classList.remove('hidden');

            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti-piece');

                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

                confettiContainer.appendChild(confetti);

                const fallDuration = Math.random() * 1 + 1;
                confetti.style.animationDuration = `${fallDuration}s`;

                setTimeout(() => {
                    confetti.remove();
                }, fallDuration * 1000);
            }
        }

        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === "s" || event.key === "S") {
                event.preventDefault();
            }
        });