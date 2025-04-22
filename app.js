/*Навбар*/

function setupNavbarScrollBehavior() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const scrollThreshold = 100; 
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
     
      if (currentScroll <= navbarHeight) {
        navbar.classList.remove('navbar-hide');
        return;
      }
      
    
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.classList.add('navbar-hide');
      } 
   
      else if (currentScroll < lastScroll && navbar.classList.contains('navbar-hide')) {
        navbar.classList.remove('navbar-hide');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  
  function setupActiveLinks() {
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
   
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdownItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });
    

    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY + navbar.offsetHeight + 20;
      
      navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupNavbarScrollBehavior();
    setupActiveLinks();
   
    const currentPath = window.location.hash;
    if (currentPath) {
      const activeLink = document.querySelector(`.nav-link[href="${currentPath}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });

const navbarStyles = `
  .navbar-hide {
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
  }
  
  .navbar {
    transition: transform 0.3s ease-in-out;
  }
  
  .nav-link.active,
  .dropdown-item.active {
    font-weight: 600;
    position: relative;
  }
  
  .nav-link.active:not(.dropdown-toggle)::after,
  .dropdown-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;

  }
  
  .dropdown-item.active::after {
    bottom: auto;
    top: 0;
    left: 0;
    transform: none;
    width: 3px;
    height: 100%;
  }
`;


const styleElement = document.createElement('style');
styleElement.innerHTML = navbarStyles;
document.head.appendChild(styleElement);  



/*____________________________________________Крутилка меню_________________________________________________*/
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItemDiv = document.getElementById('selected-item');
    const selectedImage = document.getElementById('selected-image');
    const itemName = document.getElementById('item-name');
    const itemPrice = document.getElementById('item-price');

    setTimeout(() => {
        document.querySelector('.box').style.opacity = '1';
    }, 100);

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => { 
           
            selectedItemDiv.classList.remove('show');
            
            setTimeout(() => {
                const itemNameValue = item.dataset.name;
                const itemPriceValue = item.dataset.price;
                const imageUrl = item.src;

                selectedImage.src = imageUrl;
                itemName.textContent = itemNameValue;
                itemPrice.textContent = `Цена: $${itemPriceValue}`;

               
                selectedItemDiv.classList.add('show');
            }, 300); 
        });
    });
      
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item') && !e.target.closest('.selected-item')) {
            selectedItemDiv.classList.remove('show');
        }
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
let gameCompleted = false;


document.addEventListener('DOMContentLoaded', function() {
    
    if(localStorage.getItem('gameCompleted') === 'true') {
        disableGame();
    }
    
    
    document.getElementById('show-discount').addEventListener('click', showDiscountModal);
    document.getElementById('close-modal-btn').addEventListener('click', closeDiscountModal);
    document.querySelector('.close-modal').addEventListener('click', closeDiscountModal);
});

function startGame() {
    if(gameCompleted) return;
    
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
    clearInterval(timer);
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
    gameCompleted = true;
    localStorage.setItem('gameCompleted', 'true');
}

function showDiscountModal() {
    document.getElementById('discountModal').style.display = 'flex';
}

function closeDiscountModal() {
    document.getElementById('discountModal').style.display = 'none';
}

function disableGame() {
    gameCompleted = true;
    document.querySelector(".start").style.display = "none";
    document.querySelector(".igra").textContent = "Вы уже завершили игру";
    document.querySelector(".zanovo").style.display = "none";
}

/*________________________________________Otzivi_____________________________________________________*/
document.addEventListener('DOMContentLoaded', function() {
   
    const tabs = document.querySelectorAll('.tab');
    const reviewCategories = document.querySelectorAll('.review-category');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const addReviewBtn = document.querySelector('.add-review-btn');
    const reviewModal = document.getElementById('review-modal');
    const cancelReviewBtn = document.getElementById('cancel-review');
    const reviewForm = document.getElementById('review-form');
    
 
    let currentCategory = 'coffee-shop';
    let currentReviews = {};
    
   
    function init() {
       
        reviewCategories.forEach(category => {
            const categoryId = category.id.replace('-reviews', '');
            currentReviews[categoryId] = {
                reviews: Array.from(category.querySelectorAll('.review')),
                currentIndex: 0
            };
            
           
            if (category.classList.contains('active')) {
                showReview(categoryId, 0);
            }
        });
        
       
        updateNavButtons();
    }
    
  
    function showReview(category, index) {
        const reviewsData = currentReviews[category];
        if (!reviewsData || index < 0 || index >= reviewsData.reviews.length) return;
        
      
        reviewsData.reviews.forEach(review => {
            review.classList.remove('active');
        });
        
      
        reviewsData.reviews[index].classList.add('active');
        reviewsData.currentIndex = index;
        
      
        updateNavButtons();
    }
    
   
    function updateNavButtons() {
        const reviewsData = currentReviews[currentCategory];
        if (!reviewsData) return;
        
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.disabled = reviewsData.currentIndex === 0;
        nextBtn.disabled = reviewsData.currentIndex === reviewsData.reviews.length - 1;
    }
    
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            
            reviewCategories.forEach(cat => cat.classList.remove('active'));
            document.getElementById(`${category}-reviews`).classList.add('active');
            
           
            currentCategory = category;
            
            showReview(category, 0);
        });
    });
    
   
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
    
   
    addReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'flex';
    });
    
    cancelReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });
    
    
    window.addEventListener('click', function(event) {
        if (event.target === reviewModal) {
            reviewModal.style.display = 'none';
        }
    });
    
   
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value;
        const category = document.getElementById('review-category').value;
        const text = document.getElementById('review-text').value;
        
      
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
        
       
        const categoryElement = document.getElementById(`${category}-reviews`);
        categoryElement.appendChild(reviewElement);
        
        и
        currentReviews[category].reviews.push(reviewElement);
        
       
        reviewForm.reset();
        reviewModal.style.display = 'none';
        
       
    });
    
   
    function getRandomTitle(category) {
        const titles = {
            'coffee-shop': ['Уютное место', 'Лучшая кофейня', 'Атмосферно', 'Приятная обстановка'],
            'coffee': ['Вкуснейший кофе', 'Отличный выбор', 'Прекрасный аромат', 'Идеальный баланс'],
            'staff': ['Внимательные бариста', 'Высокий уровень сервиса', 'Дружелюбный персонал', 'Профессионалы']
        };
        
        const categoryTitles = titles[category] || ['Хорошее впечатление'];
        return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    }
    
    init();
    setupCarouselNav();
});