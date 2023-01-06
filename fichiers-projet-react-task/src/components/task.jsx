import React from 'react';
import PropTypes from 'prop-types';

import DoneButton from './doneButton.jsx';
import PriorityScale from './priorityScale.jsx';

import '../assets/style/task.css'; 

export default class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    // Un composant Task affiche les informations sur la tâche à faire.
    // Il contient aussi un composant PriorityScale permettant de moduler la priorité de la tâche, auquel on fournit entre autres l'id de la tâche, sa priorité et la fonction pour modifier la priorité de la tâche.
    // Enfin, un composant DoneButton permet de terminer cette tâche. On lui fournit donc toutes les informations sur la tâche ainsi que la fonction pour terminer une tâche.
    render() {
        return (
            <div className="task">
                <div className="info">
                    {this.props.description}({this.props.duration}mn)
                </div>
                <PriorityScale {...this.props} />
                <DoneButton {...this.props} />
            </div>
        );
    }

    static propTypes = {
        priority : PropTypes.number.isRequired,
        id : PropTypes.string.isRequired,
        priorityChanged : PropTypes.func.isRequired,
        taskDone : PropTypes.func.isRequired,
        duration : PropTypes.number.isRequired,
        description : PropTypes.string.isRequired
    }

    static defaultProps = {
        priority : 1
    }
}