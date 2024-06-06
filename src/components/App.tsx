import { Routes, Route } from 'react-router-dom';

import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FirebaseDemoPage } from '../pages/FirebaseDemoPage';
import { TasksDemo } from '../pages/TasksDemo';
import { TasksPage } from '../pages/TasksPage';
import { CalendarDemo } from '../pages/CalendarDemo';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/firebase-demo" element={<FirebaseDemoPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tasks" element={<TasksDemo />} />
      <Route path="/calendar" element={<CalendarDemo />} />
    </Routes>
  );
};
