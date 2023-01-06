import React from 'react';
import PropTypes from 'prop-types';

export default class DoneTask extends React.Component {

    constructor(props) {
        super(props);
    }

    // Un composants de type DoneTask affiche simplement la description, la durée et la priorité de la tâche faite.
    render() {
        return (
          <div className="task done">
              <div className="info">
                {this.props.description}({this.props.duration}mn) (priorité : {this.props.priority})
              </div>
          </div>
        );
    }

    static propTypes = {
      priority : PropTypes.number.isRequired,
      id : PropTypes.string.isRequired,
      duration : PropTypes.number.isRequired,
      description : PropTypes.string.isRequired
  }

  static defaultProps = {
    priority : 1
  }
}