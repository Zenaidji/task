import React from 'react';
import PropTypes from 'prop-types';

import DoneTask from './doneTask.jsx';

import '../assets/style/tasklist.css';

export default class Done extends React.Component {
    constructor(props) {
        super(props);
        // hide vaut true si on doit cacher la liste des tâches faites. false sinon.
        this.state = {hide : true};

        this.handleClick = this.handleClick.bind(this);
    }

    /**fonction changeant l'état de hide lorsque l'on clique sur le bouton du composant. */
    handleClick(event) {
      this.setState(prevState => ({hide : !prevState.hide}));
    }

    // Ce composant contient simplement un bouton pour afficher/cacher les tâches faites, ainsi que la liste des tâches faites dans l'ordre dans lequel elles ont été terminées si hide vaut false.
    render() {
      // On transforme la tableau d'objets des tâches faites en un tableau de composants DoneTasks contenant toutes les informations de la tâche en question
      const tasksDone = this.props.tasks.map(
                                              task => (<DoneTask {...task} key={task.id} />)
                                            );
    
      return (
        <div className="tasklist" >
          <h3>Tâches terminées</h3>
          <button onClick={this.handleClick}>
            {this.state.hide ? `+(${this.props.tasks.length})` : '-'}
          </button>
          {this.state.hide ? '' : tasksDone}
        </div>
      );
  }

    static propTypes = {
      tasks : PropTypes.arrayOf(PropTypes.object).isRequired
    }
}