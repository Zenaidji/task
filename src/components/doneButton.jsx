import React from 'react';
import PropTypes from 'prop-types';

import '../assets/style/doneButton.css';

export default class DoneButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    /**fonction terminant la tâche associée à ce DoneButton (dont les informations sont en props.) */
    handleClick(event) {
        this.props.taskDone(this.props.id);
    }

    // Un composant DoneButton contient juste un tick: ✓. Un clic sur ce bouton termine la tâche associée.
    render() {
        return (
            <div className="doneButton" onClick={this.handleClick} >
                ✓
            </div>
        );
    }

    static propTypes = {
        id : PropTypes.string.isRequired,
        taskDone : PropTypes.func.isRequired
    }
}