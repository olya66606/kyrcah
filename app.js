// const App = {

// data(){
//     return {
//         count: 0,
//         title: 'Счётчик',
//     }
// }
// }
// Vue.createApp(App).mount('#app');






// const App = {

// data(){
//     return {
//         placeholderString: 'Введите список заметок',
//         title: 'Список заметок',
//         inputValue: '',
//         notes: []
//     }
// },


// methods: {
//         inputChangeHandler(event){
//             this.inputValue = event.target.value; 
//         },
//         addNewNote(){
//             if(this.inputValue != 0){
//                 this.notes.push(this.inputValue);
//                 this.inputValue = '';
//             }
//         },
//         toUpperCase(item){
//             return item.toUpperCase();
//         },
//         removeNote(index){
//             this.notes.splice(index, 1);
//         },
//         numberOfSymbols(){
//             console.log('numberOfSymbols');
//             return this.notes.join('').length;
//         },
//     },
//     computed: {
//         numberOfSymbols2(){
//             console.log('numberOfSymbols2');
//             return this.notes.join('').length;
//         }
//     },
//     watch: {
//         inputValue(value){
//             if(value.length > 10) {
//                 this.inputValue = '';
//             }
//         }
//     },
// }
//     Vue.createApp(App).mount('#app');
    



// let email= document.querySelector('email').value;
// let login= document.querySelector('login');
// let password= document.querySelector('password');
// let btn=document.querySelector('btn');

// btn.addEventListener('click', ()=>{
// if(email.value.lenght<5 || email.value.indexOf('@')===-1){
//     return{
        
//     }
// }


// });



//Весокосный год с помощью vue
// const App = {
//     data(){
//         return {
//             title: 'Весокосный год',
//             MyPlaceholder: 'Введите первый год',
//             MyPlaceholderTwo: 'Введите конечный год',
//             kol:[],
//             oneYear:null,
//             twoYear:null,
//             count:null,
//         }
//     },
//     methods: {
//         countYear(){
//             this.count = [];
//             for(let i=this.oneYear; i<=this.twoYear; i++){
//                 if((i%4===0 && i%100!==0) || i%400===0){
//                     this.kol.push(i);
//                     this.count=this.kol.length;
//                 }
//                 else{
//                     console.log('Ochibka')
//                 }
//             }
//         }
        
//     }
// };

// Vue.createApp(App).mount('#App');





//Блокнот с помощью vue
// const App={
//     data(){
//         return{
//             title: 'Список задач',
//             newTask: '',
//             Category:'',
//             tasks:[],
//             persTask:[],
//             shopTask:[],
//         }
//     },


//     methods:{
//         addTask(){
           
//             if(this.newTask&& this.Category){
//                 if(this.Category==="Работа"){
//                     this.tasks.push(this.newTask);
//                 }
//                 else if(this.Category==="Личное"){
//                     this.persTask.push(this.newTask);
//                 }
//                 else if(this.Category==="Покупки"){
//                     this.shopTask.push(this.newTask);
//                 }

//                 this.newTask='';
//                 this.Category='';

//             }
//         } ,
//         removeTask(index, category){
//             if(category==="Работа"){
//                 this.tasks.splice(index, 1);
//             }
//             else if(category==="Личное"){
//                 this.persTask.splice(index, 1);
//             }
//             else if(category==="Покупки"){
//                 this.shopTask.splice(index, 1);
//             }
        
//         }
        
//     }
// };
// Vue.createApp(App).mount('#App');

// const App={
//         data(){
//             return{
//             amount:0;
               
               
//             }
//         },
//     }





// Vue.createApp(App).mount('#App');


document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('coffee-card-container');
    const cards = cardContainer.querySelectorAll('.card');
    const links = cardContainer.querySelectorAll('.card-link.silka');

    // Скрываем все карточки, кроме первой
    for (let i = 1; i < cards.length; i++) {
      cards[i].classList.add('hidden');
    }

    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке

        const targetCardId = this.dataset.target;
        if (targetCardId) {
          // Скрываем все карточки
          cards.forEach(card => card.classList.add('hidden'));

          // Показываем целевую карточку
          const targetCard = document.getElementById(targetCardId);
          if (targetCard) {
            targetCard.classList.remove('hidden');
          }
        }
      });
    });
  });



