import ReactDOM from 'react-dom';

// import ReactJs components
import TaskApp from '../components/taskApp.jsx';

/*
* create React root element and insert it into document
*/
const bootstrapReact =
  () => ReactDOM.render(
            <TaskApp />,
            document.getElementById('insertReactHere')
        );


window.addEventListener('DOMContentLoaded', bootstrapReact );
