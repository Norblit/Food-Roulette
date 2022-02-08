const title = document.querySelector('.title')
const addBtn = document.querySelector('.addBtn');
const foodInput = document.querySelector('#foodInput')
const sideList = document.querySelector('.sideList')
const mainBtn = document.querySelector('.mainBtn')
const bin = document.getElementsByClassName('bin')
const clearBtn = document.querySelector('.clearBtn');
const li = document.getElementsByTagName('li');
const testBtn = document.querySelector('.testBtn');
const devInfo = document.querySelector('.dev-info')
const sidebar = document.querySelector('.sidebar')
const menu = document.querySelector('.menu')

const foodList = [];
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

window.addEventListener('load',()=>{
    foodInput.focus();
    title.classList.add('animate__animated','animate__fadeInLeftBig')
    sidebar.classList.add('animate__animated','animate__fadeInRightBig')
    menu.classList.add('animate__animated','animate__fadeInRightBig')
    devInfo.classList.add('animate__animated','animate__fadeInLeftBig')
    mainBtn.classList.add('animate__animated','animate__fadeInRightBig')
})

// Verification/insertion event
addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let value = foodInput.value.trim().toLowerCase();
    if(!value || !isNaN(parseInt(value)) || specialChars.test(value) || matchWord(value)){
        errorResponse();
    }else if(checkMax(foodList)){
        errorResponse();
    }
    else{
        addToList(value);
        itemHideIteration(foodList);
    }
})
// Generates random item from list
mainBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    itemGenerate(foodList);
})  
// Clear button
clearBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    foodInput.value = '';
    foodInput.placeholder = 'Enter an item..'
    foodInput.focus();
    mainBtn.innerText = 'GENERATE'
    while (foodList.length > 0) {
        li[0].remove();
        foodList.splice(0, 1);
    }
})

// Animation reset (GENERATOR BUTTON)
mainBtn.addEventListener('animationend', () => {
    mainBtn.classList.remove('animate__animated','animate__headShake');
    mainBtn.classList.remove('mainSuccess');
    mainBtn.classList.remove('animate__animated','animate__fadeInRightBig')
});
// Animation reset (INPUT)
foodInput.addEventListener('animationend', () => {
    foodInput.classList.remove('animate__animated','animate__headShake');
});

// Modular functions
matchWord = (word) =>{
    for(let i = 0; i< foodList.length;i++){
        if(word == foodList[i]){
            return true;
        }
    }
}

errorResponse = ()=>{
    foodInput.value = '';
    foodInput.classList.add('animate__animated','animate__headShake');
    foodInput.placeholder = 'Enter an item..';
    foodInput.focus();
}
errorResponseGen = ()=>{
    mainBtn.classList.add('animate__animated','animate__headShake');
    foodInput.focus();
}
addToList = (value) =>{
    let el = document.createElement('li')
    let span = document.createElement('span')
    let img = document.createElement('img')
    img.src = './images/bin2.svg';
    foodList.push(value)
    el.append(value.trim().toUpperCase())
    span.append(img);
    el.append(span)
    span.classList.add('bin')
    sideList.append(el)
    foodInput.value = '';
    foodInput.placeholder = 'Enter another..';
    foodInput.focus();
}
itemHideIteration = (list) =>{
    for(let i = 0;i<list.length;i++){
        bin[i].addEventListener('click', (e)=>{
            bin[i].parentElement.style.display = 'none'
            list[i] = '';
        })
    }
}
itemGenerate = (list) =>{
    let rand = Math.floor(Math.random() * list.length);
    if(checkMin(foodList)){
        while(list[rand].length){
            mainBtn.textContent = list[rand].toUpperCase();
            mainBtn.classList.add('mainSuccess');
            break;
        }
    }
    else{
        errorResponseGen();
    }
}
checkMax = (list)=>{
    let counter = 0;
    for(let i = 0;i<list.length;i++){
        if(list[i]){
            counter++;
            if(counter == 20){
                return true;
            }
        }
    }
}
checkMin = (list)=>{
    let counter = 0;
    for(let i = 0;i<list.length;i++){
        if(list[i]){
            counter++;
            if(counter >= 2){
                return true;
            }
        }
    }
}







// Testing purposes below
// const testList = ['this', 'is', 'a', 'test'];

// for(let i = 0;i<testList.length;i++){
//     hardCodeAdd(testList[i])
// }
// testBtn.addEventListener('click',(e)=>{
//     e.preventDefault()
//     addToListTest(foodInput.value)
//     itemHideIteration(testList);
// })
// addToListTest = (value) =>{
//     let el = document.createElement('li')
//     let span = document.createElement('span')
//     let img = document.createElement('img')
//     img.src = './images/bin.svg';
//     testList.push(value)
//     el.append(value.trim().toUpperCase())
//     span.append(img);
//     el.append(span)
//     span.classList.add('bin')
//     sideList.append(el)
//     foodInput.value = '';
//     foodInput.placeholder = 'Enter another..';
//     foodInput.focus();
// }
// hardCodeAdd = (value) =>{
//     let el = document.createElement('li')
//     let span = document.createElement('span')
//     let img = document.createElement('img')
//     img.src = './images/bin.svg';
//     el.append(value.trim().toUpperCase())
//     span.append(img);
//     el.append(span)
//     span.classList.add('bin')
//     sideList.append(el)
// }
