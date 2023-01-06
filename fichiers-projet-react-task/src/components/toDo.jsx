import React from 'react';
import PropTypes from 'prop-types';

import Task from './task.jsx';


import '../assets/style/tasklist.css';

/** Fonction de comparaison qui renvoie 1 si la priorité de `task1` est strictement inférieure à celle de `task2`, 0 si elles sont égales ou -1 si la priorité de `task1` est strictement supérieure à celle de task2. */
const compare = (task1, task2) => {
  if(task1.props.priority < task2.props.priority)
    return 1;
  else if (task1.props.priority > task2.props.priority)
    return -1;

  return 0;
}

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        // L'état contient la valeur du filtre (chaîne vide par défaut). Elle est dans l'état car ce qui est affiché dans l'application dépend de la valeur du filtre.
        this.state = {filterValue : ''};
        this.handleChange = this.handleChange.bind(this);
    }

    /**fonction changeant l'état de la valeur du filtre lorsque la valeur du composant input associé change.*/
    handleChange(event) {
      this.setState({filterValue : event.target.value});
    }

    // Un composant ToDo contient un input servant de filtre d'affichage des tâches, ainsi qu'une liste de composants Task représentant les tâches à faire
    render() {
      // On filtre les tâches à faire en ne conservant que celles dont la description contient la valeur du filtre (sans sensibilité à la casse).
      // Puis, on transforme ce tableau d'objets de tâche en un tableau de composants Task auxquels on fournit toutes les informations sur la tâche en question ainsi que les fonctions pour terminer et changer la priorité d'une tâche.
      // Enfin, on trie les tâches par ordre décroissant de priorité.
      const tasksToDo = this.props.tasks.filter(task => task.description.toLowerCase().includes(this.state.filterValue.toLowerCase()))
                                        .map(
                                              task => (<Task {...task} taskDone={this.props.taskDone} priorityChanged={this.props.priorityChanged} key={task.id} />)
                                             )
                                        .sort(compare);

      return (
        <div className="tasklist" >
          <h3>Tâches en cours</h3>
          <input type="text" placeholder="filtre" value={this.state.filterValue} onChange={this.handleChange} />
          <div>
            Il y a {tasksToDo.length} tâches en cours. Pour une durée de {tasksToDo.reduce((prevValue, task) => prevValue + task.props.duration, 0)} minutes.
            {tasksToDo}
          </div>
        </div>
      );
    }

    static propTypes = {
      tasks : PropTypes.arrayOf(PropTypes.object).isRequired,
      taskDone : PropTypes.func.isRequired,
      priorityChanged : PropTypes.func.isRequired
    }
}