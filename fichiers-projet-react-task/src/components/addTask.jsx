import React from 'react';
import PropTypes from 'prop-types';

import '../assets/style/addtask.css';

export default class AddTask extends React.Component {
  
    constructor(props) {
        super(props);
        // la référence de l'élément DOM input permettant d'entrer la description de la tâche à ajouter.
        this.refDescription = React.createRef();
        // la référence de l'élément DOM input permettant d'entrer la durée de la tâche à ajouter.
        this.refDuration = React.createRef();
        /* Ces deux éléments ne sont pas contrôllés par React car leur contenu n'influence pas le contenu de l'apllication. */
        this.handleClick = this.handleClick.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    /**Fonction permettant de vider le champ input permettant d'entrer la description et de remettre la valeur du champ input permettant d'entrer la durée à 10. */
    clearFields() {
      this.refDescription.current.value = '';
      this.refDuration.current.value = '10';
    }

    /**fonction permettant d'ajouter une tâche (si le champ input permettant d'entrer la description n'est pas vide) dont la description et la durée sont les valeurs des éléments input correspondants.  */
    handleClick(event) {
      if(this.refDescription.current.value !== '') {
        // On appelle la fonction fournie en props par TaskApp pour mettre à jour l'état de l'application.
        this.props.addTask(this.refDescription.current.value, parseInt(this.refDuration.current.value));
        // On réinitialise les champs des éléments input.
        this.clearFields();
      }
    }

    // Un élément AddTask contient deux éléments input de type text et number permettant d'entrer respectivement la description et la durée de la tâche à ajouter, ainsi qu'un bouton permettant de confirmer l'ajout de cette nouvelle tâche.
    render() {
        return (
          <div className="addTask">
              <input type="text" defaultValue="" placeholder="dormir" required="" ref={this.refDescription} />
              <input type="number" min="1" step="1" defaultValue="10" placeholder="1" ref={this.refDuration} />mn
              <button onClick={this.handleClick}>add</button>
          </div>
        );
    }

    static propTypes = {
      addTask : PropTypes.func.isRequired
    }
}