const taskUpdate = document.getElementById("taskUpdate");
const count = document.querySelector(".count");

taskUpdate.addEventListener('keyup', () => {    
    const countLetter = taskUpdate.value.length
    count.innerText = countLetter
})







