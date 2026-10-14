let inputSection=document.getElementById("input-section");
let Category=document.getElementById("Category");
let taskList=document.querySelector(".task-list");
let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
let saveData=(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
})
 
let displayTask=((type="all")=>{
taskList.innerHTML="";
let data=tasks;
if(type==="completed"){
    data=tasks.filter(task=>task.completed)


    }else if(type==="pending"){
        data=tasks.filter(task=>!task.completed)
    }
    data.forEach((task)=>{
        const li=document.createElement("li")
        let index=tasks.indexOf(task)
        if(task.completed){
            li.classList.add("completed")
        }
li.innerHTML=`    <div class="list-left">
        <input type="checkbox" ${task.completed ? "checked ": ""} onchange="toggleTask(${index})" >
        <span>${task.name}</span>
        <span>${task.Category}</span>
        </div>
        <button class="delbtn" onclick="deleteTask(${index})">Delete</button>
        
`
taskList.appendChild(li);
        
    })


})

let addTask=(()=>{
    let taskName=inputSection.value.trim();
    if(taskName===""){
alert("Please Enter The Task")
return
    }
    tasks.push({
        name:taskName,
        Category:Category.value,
        completed:false
    })
    saveData();
    displayTask();
    inputSection.value="";

})

let toggleTask=((index)=>{
    tasks[index].completed=!tasks[index].completed;
    saveData();
    displayTask();

})

let deleteTask=((index)=>{
    tasks.splice(index,1)
    saveData();
    displayTask();
})
let taskButton=((type)=>{
displayTask(type.toLowerCase())
})

document.querySelector(".addbtn").addEventListener("click",addTask)
displayTask();