/*Навбар*/
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= navbarHeight) {
    navbar.classList.remove('hide');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
    
    navbar.classList.add('hide');
  } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
   
    navbar.classList.remove('hide');
  }
  
  lastScroll = currentScroll;
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});



/*____________________________________________Крутилка меню_________________________________________________*/
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItemDiv = document.getElementById('selected-item');
    const selectedImage = document.getElementById('selected-image');
    const itemName = document.getElementById('item-name');
    const itemPrice = document.getElementById('item-price');

    // Плавное появление элементов меню
    setTimeout(() => {
        document.querySelector('.box').style.opacity = '1';
    }, 100);

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 

            const itemNameValue = item.dataset.name;
            const itemPriceValue = item.dataset.price;
            const imageUrl = item.src;

            selectedImage.src = imageUrl;
            itemName.textContent = itemNameValue;
            itemPrice.textContent = `Price: $${itemPriceValue}`;

            // Плавное появление выбранного элемента
            selectedItemDiv.classList.add('show');
            selectedItemDiv.style.display = 'flex';
        });
    });
});

/*__________________________________________OSnova_________________________________________________________________*/
const questions = [
    { question: "Какой кофе содержит молоко?", answers: ["Эспрессо", "Капучино", "Американо"], correct: 1 },
    { question: "Кофе, на основе сливок?", answers: ["Фильтр-кофе", "Раф", "Эспрессо"], correct: 1 },
    { question: "Какой кофе имеет крепкий вкус?", answers: ["Латте", "Эспрессо", "Капучино"], correct: 1 },
    { question: "Что из этого напиток?", answers: ["Личи", "Мокко", "Мандарин"], correct: 1 },
    { question: "Кофе c молоком?", answers: ["Латте", "Американо", "Эспрессо"], correct: 0 }
];
let timer;
let timeLeft = 60;
let currentQuestionIndex = 0;

function startGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("loss").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.querySelector(".igra").style.display = "none";
    document.querySelector(".start").style.display = "none";
    currentQuestionIndex = 0;
    timeLeft = 60;
    loadQuestion();
    startTimer();
}

function startTimer() {
    document.getElementById("timer-cup").textContent = "Осталось " + timeLeft + " ";
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-cup").textContent = "Осталось " + timeLeft + " ";
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
        clearInterval(timer); 
        winGame();
    }
}

function checkAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestionIndex].correct) {
        currentQuestionIndex++;
        loadQuestion(); 
    } else {
        clearInterval(timer);
        gameOver();
    }
}


function gameOver() {
    document.getElementById("game").style.display = "none";
    document.getElementById("loss").style.display = "block";

}

function winGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("win").style.display = "block";

}




/*________________________________________Otzivi_____________________________________________________*/
document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const tabs = document.querySelectorAll('.tab');
    const reviewCategories = document.querySelectorAll('.review-category');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const addReviewBtn = document.querySelector('.add-review-btn');
    const reviewModal = document.getElementById('review-modal');
    const cancelReviewBtn = document.getElementById('cancel-review');
    const reviewForm = document.getElementById('review-form');
    
    // Текущее состояние
    let currentCategory = 'coffee-shop';
    let currentReviews = {};
    
    // Инициализация
    function init() {
        // Для каждой категории сохраняем отзывы и текущий индекс
        reviewCategories.forEach(category => {
            const categoryId = category.id.replace('-reviews', '');
            currentReviews[categoryId] = {
                reviews: Array.from(category.querySelectorAll('.review')),
                currentIndex: 0
            };
            
            // Показываем первый отзыв в категории
            if (category.classList.contains('active')) {
                showReview(categoryId, 0);
            }
        });
        
        // Проверяем, нужно ли отключать кнопки навигации
        updateNavButtons();
    }
    
    // Показать конкретный отзыв
    function showReview(category, index) {
        const reviewsData = currentReviews[category];
        if (!reviewsData || index < 0 || index >= reviewsData.reviews.length) return;
        
        // Скрываем все отзывы в категории
        reviewsData.reviews.forEach(review => {
            review.classList.remove('active');
        });
        
        // Показываем выбранный
        reviewsData.reviews[index].classList.add('active');
        reviewsData.currentIndex = index;
        
        // Обновляем кнопки навигации
        updateNavButtons();
    }
    
    // Обновление состояния кнопок навигации
    function updateNavButtons() {
        const reviewsData = currentReviews[currentCategory];
        if (!reviewsData) return;
        
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.disabled = reviewsData.currentIndex === 0;
        nextBtn.disabled = reviewsData.currentIndex === reviewsData.reviews.length - 1;
    }
    
    // Переключение категорий
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Обновляем активную вкладку
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Обновляем активную категорию отзывов
            reviewCategories.forEach(cat => cat.classList.remove('active'));
            document.getElementById(`${category}-reviews`).classList.add('active');
            
            // Обновляем текущую категорию
            currentCategory = category;
            
            // Показываем первый отзыв в новой категории
            showReview(category, 0);
        });
    });
    
    // Навигация по отзывам
    function setupCarouselNav() {
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;
                const reviewsData = currentReviews[currentCategory];
                showReview(currentCategory, reviewsData.currentIndex - 1);
            });
        });
        
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;
                const reviewsData = currentReviews[currentCategory];
                showReview(currentCategory, reviewsData.currentIndex + 1);
            });
        });
    }
    
    // Управление модальным окном
    addReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'flex';
    });
    
    cancelReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === reviewModal) {
            reviewModal.style.display = 'none';
        }
    });
    
    // Обработка формы отзыва
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value;
        const category = document.getElementById('review-category').value;
        const text = document.getElementById('review-text').value;
        
        // Создаем новый отзыв
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        
        const title = document.createElement('h3');
        title.textContent = getRandomTitle(category);
        
        const content = document.createElement('p');
        content.textContent = text;
        
        const author = document.createElement('p');
        author.className = 'review-author';
        author.textContent = `— ${name}`;
        
        reviewElement.appendChild(title);
        reviewElement.appendChild(content);
        reviewElement.appendChild(author);
        
        // Добавляем отзыв в соответствующую категорию
        const categoryElement = document.getElementById(`${category}-reviews`);
        categoryElement.appendChild(reviewElement);
        
        // Обновляем список отзывов в текущей категории
        currentReviews[category].reviews.push(reviewElement);
        
        // Сбрасываем форму и закрываем модальное окно
        reviewForm.reset();
        reviewModal.style.display = 'none';
        
       
    });
    
    // Генерация заголовков для отзывов
    function getRandomTitle(category) {
        const titles = {
            'coffee-shop': ['Уютное место', 'Лучшая кофейня', 'Атмосферно', 'Приятная обстановка'],
            'coffee': ['Вкуснейший кофе', 'Отличный выбор', 'Прекрасный аромат', 'Идеальный баланс'],
            'staff': ['Внимательные бариста', 'Высокий уровень сервиса', 'Дружелюбный персонал', 'Профессионалы']
        };
        
        const categoryTitles = titles[category] || ['Хорошее впечатление'];
        return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    }
    
    // Инициализируем приложение
    init();
    setupCarouselNav();
});