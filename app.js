import { createInterface} from 'readline'
import { readFileSync, writeFileSync } from 'fs'
import chalk  from 'chalk'

const tasks = []
const DB_FILE = "tasks.txt"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

const displayMenu = ()=>{
    console.log(chalk.blue('\n|----------------------------------|'));
    console.log(chalk.redBright.bold("👽👽👽 Todo App 👽👽👽"));
    console.log("  1. Agregar Tarea");
    console.log("  2. Listar tarea");
    console.log("  3. Compepltar tarea");
    console.log("  4. Elimnar tarea ");
    console.log("  5. Salir ");
    console.log(chalk.blue('|----------------------------------|\n'));
    
}
const listTasks = ()=>{
    console.log(chalk.yellow.bold("n\n\✅ Lista de Tareas ✅"));
    if(tasks.length  === 0){return console.log(chalk.red("No hay taeras"));}

    for(var i=0; i<tasks.length; i++){
        var completed
        if(tasks[i].completed){
            completed = "✅"
        }else{
            completed = "❌"
        }
        console.log('>',i+1,".- ",completed,' ' ,tasks[i].task);
    }
    displayMenu()
    chooseOption()
}
const addTask= ()=>{
    rl.question(chalk.bgMagenta("\nEscribe la tarea"),( (task,completed = false)=>{
        tasks.push({task, completed:completed})
        console.log(chalk.bgGreen.bold("Tarea agregada con Exito"));
        displayMenu()
        chooseOption();
        
        listTasks()
       
    }))
}

const completedTask = ()=>{
    rl.question( 
        chalk.bgCyanBright("Digite el numero de tarea a Completar"),
        
        (taskNumber)=>{
            const indexNumber = parseInt(taskNumber)-1
            if(indexNumber >= 0 && indexNumber < tasks.length){
                console.log( chalk.green.bold("Tarea marcada con exito \n\n"));
                
                tasks[indexNumber].completed = true
            }else{
                console.log(chalk.red.bold("Numero de tarea no existe"));
            }
            listTasks();
           
        }
    )
}

const deleteTask = ()=>{
    rl.question(
        chalk.bgRed.bold("🔖Digite Numero Tarea a Borrar") ,
        (indexTask)=>{
            const indexNumber = parseInt(indexTask)-1

            if(indexNumber >= 0 && indexNumber < tasks.length) {
                tasks.splice(indexNumber, 1)
                console.log('Tarea BORRADA CON EXITO');
                displayMenu();
                chooseOption();
            }else{

                displayMenu();
                chooseOption();
                console.log("TAREA NO FUE BORRADA ;(");
            }
            
    })
}
const chooseOption = ()=>{
    rl.question("Elige el numero de tu opcion", (choice)=>{

        switch (choice){
            case "1":
                console.log("Crear Tareas");
                addTask()
                break;
            case "2":
                console.log("Listar Tareas");
                listTasks();
                break; 
            case "3":
                console.log("Completar Tarea");
                completedTask()
                break;
            case "4":
                console.log('Elminar tarea');
                deleteTask()
                break;
            
            case "5":
                console.log(chalk.yellow("👋 Adios"));
                rl.close();
                break;
            
            default:
                console.log(chalk.red("intenta Nuevamente \n"));
                displayMenu()
                chooseOption()
                break;
        }
    })
}

displayMenu()
chooseOption()

