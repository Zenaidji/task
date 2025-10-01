import React from 'react';
import PropTypes from 'prop-types';

import PriorityLevel from './priorityLevel.jsx';

import '../assets/style/priorityScale.css';

export default class PriorityScale extends React.Component {
    constructor(props) {
        super(props);
    }

    // Un composant PriorityScale contient juste une liste de composants PriorityLevel pour lesquels une priorité est associée à chacun.
    // Le composant affiche aussi la priorité actuelle de la tâche associée.
    render() {
        // On crée et initialise les niveaux des futurs PriorityLevel.
        let levels = []

        for(let i = 1; i <= this.props.nbLevels; i++) {
            levels.push(i);
        }

        // On transforme ce tableau de niveau de priorité en tableau de composants PriorityLevel. On leur fournit le niveau de priorité qu'ils représentent, la fonction permettant de changer la priorité d'une tâche ainsi que l'id et la priorité actuelle de la tâche associée.
        levels = levels.map(
            level => (<PriorityLevel key={level} level={level} priority={this.props.priority} priorityChanged={this.props.priorityChanged} id={this.props.id} />)
        );

        return (
            <div className="scale">
                {levels}({this.props.priority})
            </div>
        );
    }

    static propTypes = {
        priority : PropTypes.number.isRequired,
        id : PropTypes.string.isRequired,
        priorityChanged : PropTypes.func.isRequired,
        // Le nombre de PriorityLevel (niveaux de priorité).
        nbLevels : PropTypes.number.isRequired
    }

    static defaultProps = {
        nbLevels : 6
    }
}