import * as React from 'react';
import './styles.css';
import { Landing } from './pages/Landing';
import { TaskModal } from './common/components/TaskModal';

const App = React.memo(() => {
	return <Landing />;
});

export default App;
