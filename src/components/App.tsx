import { Routes, Route } from 'react-router-dom';

import { AuthPage } from '../pages/AuthPage';
import { TasksPage } from '../pages/TasksPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};
