import * as readline from 'readline';


interface TaskList {
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
}

class Task {
  public title: string;
  public description: string;
  public dueDate: Date;
  public isCompleted: boolean;
  public taskList: TaskList[];

  constructor(
    title: string,
    description: string,
    dueDate: Date,
    isCompleted: boolean
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.taskList = [];
  }

  updateTask(status: string): void {
    if (status === "completed") {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }

    console.log(`Task status with ${this.title} has been updated`);
  }
}

class TaskManager {
  taskList: Task[] = [];

  addTask(title: string, description: string, dueDate: Date, status: string): void {
    const newTask = new Task(title, description, dueDate, status === "completed");
    this.taskList.push(newTask);
    console.log(`Task '${title}' added to the list.`);
  }

  deleteTask(title: string): void {
    const index = this.taskList.findIndex((task) => task.title === title);
    if (index !== -1) {
      this.taskList.splice(index, 1);
      console.log(`Task '${title}' deleted.`);
    } else {
      console.log(`Task '${title}' not found.`);
    }
  }

  // Method to filter tasks based on completion status
  filterTasks(completed: boolean): Task[] {
    return this.taskList.filter((task) => task.isCompleted === completed);
  }

  // Method to generate reports
  generateReport(): void {
    const completedTasks = this.filterTasks(true).length;
    const pendingTasks = this.filterTasks(false).length;

    console.log(`Completed Tasks: ${completedTasks}`);
    console.log(`Pending Tasks: ${pendingTasks}`);
  }
}

const taskManager = new TaskManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu(): void {
  console.log('Task Management System:');
  console.log('1. Add Task');
  console.log('2. Delete Task');
  console.log('3. Generate Report');
  console.log('4. Exit');
}

function addTask(): void {
  rl.question('Enter task title: ', (title: string) => {
    rl.question('Enter task description: ', (description: string) => {
      rl.question('Enter due date (YYYY-MM-DD): ', (dueDate: string | number | Date) => {
        rl.question('Is task completed? (yes/no): ', (status: string) => {
          const newDate = new Date(dueDate);
          taskManager.addTask(title, description, newDate, status);
          displayMenu();
          askForAction();
        });
      });
    });
  });
}

function deleteTask(): void {
  rl.question('Enter task title to delete: ', (title: string) => {
    taskManager.deleteTask(title);
    displayMenu();
    askForAction();
  });
}

function generateReport(): void {
  taskManager.generateReport();
  displayMenu();
  askForAction();
}

function askForAction(): void {
  rl.question('Enter your choice: ', (choice: any) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        deleteTask();
        break;
      case '3':
        generateReport();
        break;
      case '4':
        console.log('Exiting Task Management System...');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        displayMenu();
        askForAction();
        break;
    }
  });
}

displayMenu();
askForAction();
