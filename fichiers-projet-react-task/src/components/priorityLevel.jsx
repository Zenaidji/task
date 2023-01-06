import React from 'react';
import PropTypes from 'prop-types';

import '../assets/style/priorityLevel.css';

export default class PriorityLevel extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /**Fonction permettant de changer la priorité de la tâche associée en la fixant au niveau de priorité représenté par ce PriorityLevel */
    handleClick(event) {
        // On appelle la fonction permettant de changer la priorité de la tâche associée.
        this.props.priorityChanged(this.props.id, this.props.level);
    }

    // Un composant PriorityLevel ne contient rien. C'est juste un carré avec une couleur grâce au style css.
    render() {
        return (
            <div className="level" onClick={this.handleClick}>
                <div className={this.props.level <= this.props.priority ? "on" : "off"}>
                    
                </div>
            </div>
        );
    }

    static propTypes = {
        priority : PropTypes.number.isRequired,
        id : PropTypes.string.isRequired,
        priorityChanged : PropTypes.func.isRequired,
        level : PropTypes.number.isRequired
    }
}