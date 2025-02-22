 const questions = [
            { question: "Какой кофе содержит молоко?", answers: ["Эспрессо", "Капучино", "Американо"], correct: 1 },
            { question: "Кофе, приготовленный с помощью давления воздуха?", answers: ["Фильтр-кофе", "Эспрессо", "Раф"], correct: 1 },
            { question: "Какой кофе имеет крепкий вкус?", answers: ["Латте", "Эспрессо", "Капучино"], correct: 1 },
            { question: "Какой напиток готовится на основе эспрессо и горячего молока?", answers: ["Личи", "Капучино", "Мокко"], correct: 1 },
            { question: "Кофе, который заваривается молоком?", answers: ["Латте", "Американо", "Эспрессо"], correct: 0 }
        ];
        let timer;
        let timeLeft = 120; // 2 минуты
        let currentQuestionIndex = 0;

        function startGame() {
            document.getElementById("game").style.display = "block";
            document.getElementById("loss").style.display = "none";
            document.getElementById("win").style.display = "none";
            currentQuestionIndex = 0;
            timeLeft = 120;
            loadQuestion();
            startTimer();
        }

        function startTimer() {
            document.getElementById("timer").textContent = "Время: " + timeLeft + " секунд";
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer").textContent = "Время: " + timeLeft + " секунд";
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    gameOver();
                }
            }, 1000);
        }

        function loadQuestion() {
            if (currentQuestionIndex < questions.length) {
                const q = questions[currentQuestionIndex];
                document.getElementById("question-container").innerHTML = `
                    <p>${q.question}</p>
                    <button onclick="checkAnswer(0)">${q.answers[0]}</button>
                    <button onclick="checkAnswer(1)">${q.answers[1]}</button>
                    <button onclick="checkAnswer(2)">${q.answers[2]}</button>
                `;
            } else {
                winGame();
            }
        }

        function checkAnswer(answerIndex) {
            const correctIndex = questions[currentQuestionIndex].correct;
            if (answerIndex === correctIndex) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                gameOver();
            }
        }

        function winGame() {
            clearInterval(timer);
            document.getElementById("win").style.display = "block";
            document.getElementById("game").style.display = "none";
        }

        function gameOver() {
            clearInterval(timer);
            document.getElementById("loss").style.display = "block";
            document.getElementById("game").style.display = "none";
        }






        
        let currentPage = 0;
        const pages = document.querySelectorAll('.page');
    
        function showPage(index) {
            pages.forEach((page, i) => {
                page.classList.toggle('active', i === index);
            });
        }
    
        function nextPage() {
            currentPage = (currentPage + 1) % pages.length;
            showPage(currentPage);
        }
    
        function prevPage() {
            currentPage = (currentPage - 1 + pages.length) % pages.length;
            showPage(currentPage);
        }



