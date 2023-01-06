import React from 'react';

import AddTask from './addTask.jsx';
import ToDo from './toDo.jsx';
import Done from './done.jsx';
import taskData from '../data/tasksData.js';

import '../assets/style/taskApp.css';

/*
 define root component
*/
export default class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // les tâches à faire
      tasksToDo : [],
      // les tâches faites
      tasksDone : []
    };

    this.taskDone = this.taskDone.bind(this);
    this.priorityChanged = this.priorityChanged.bind(this);
    this.addTask = this.addTask.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
  }

  componentDidMount() {
    /* tâches stockées dans l'espace de stockage local. */
    const state = localStorage.getItem('state');

    if (state) {
      // Si ce n'est pas la 1ère fois que l'on lance l'application alors on récupère les tâches dans le stockage local.
      this.setState(JSON.parse(state))
    } else {
      // Si c'est la 1ère fois que l'on lance l'application alors on récupère les tâches à partir de taskData et on leur initialisa une priorité à 1.
      taskData.forEach(task => task.priority = 1);
      this.setState({tasksToDo : taskData});
    }
  }

  /*sauvegarde des tâches dans l'espace de stockage local. */
  saveStateToLocalStorage() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  /** fonction qui fait passer la tâche d'id `taskId` de la liste des tâches à faire à la liste des tâches faites. */
  taskDone(taskId) {
    // La tâche à basculer dans les tâches faites.
    const task = this.state.tasksToDo.find(task => task.id === taskId);
    //Copie du tableau représentant les tâches restantes à faire
    const tasksLeft = [...this.state.tasksToDo];
    // On enlève la tâche des tâches à faire.
    tasksLeft.splice(tasksLeft.indexOf(task), 1);
    // On fait un setState pour actualiser l'état.
    this.setState({
      tasksToDo : tasksLeft,
      // On ajoute la tâche à la liste des tâches faites.
      tasksDone : [...this.state.tasksDone, task]
    }, this.saveStateToLocalStorage);
  }

  /** fonction qui fait passer la priorité de la tâche d'id `taskId` à `newPriority`*/
  priorityChanged(taskId, newPriority) {
    // La tâche dont on change la priorité.
    const taskToChange = this.state.tasksToDo.find(task => task.id === taskId);
    // On change la priorité.
    taskToChange.priority = newPriority;
    // On fait une copie du tableau des tâches à faire pour faire ensuite un setState afin que la page se rafraîchisse.
    const newTaskList = [...this.state.tasksToDo];

    this.setState({tasksToDo : newTaskList}, this.saveStateToLocalStorage);
  }

  /** fonction qui ajoute une nouvelle tâche de durée `duration` et de description `description` à la liste des tâches à faire. */
  addTask(description, duration) { 
    // Nouvelle liste des tâches à faire.
    const newTasksToDo = [
        ...this.state.tasksToDo, 
        // nouvelle tâche: son id est généré à partir des longueurs des 2 listes de tâches. Sa priorité vaut 1.
        {
          id : 'T' + (this.state.tasksToDo.length + this.state.tasksDone.length + 1),
          description : description,
          duration : duration,
          priority : 1
        }
      ]

    // setState pour actualiser l'état
    this.setState({tasksToDo : newTasksToDo}, this.saveStateToLocalStorage);
  }

  /* L'application contient 3 composants: un composant qui permet d'ajouter des nouvelles tâches auquel on fournit la fonction permettant d'ajouter une tâche,
    un composant qui liste les tâches à faire auquel on fournit la liste des tâches à faire ainsi que les fonctions pour terminer ou changer la priorité d'une tâche, 
    un composant qui liste les tâches faites auquel on fournit la liste des tâches faites.
  */
  render() {
    return (
      <div className="taskApp">
        <AddTask addTask={this.addTask} />
        <ToDo tasks={this.state.tasksToDo} taskDone={this.taskDone} priorityChanged={this.priorityChanged} />
        <Done tasks={this.state.tasksDone} />
      </div>
    );
  }
}
