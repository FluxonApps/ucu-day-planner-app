import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import { TaskList } from '../components/TaskList';

const auth = getAuth();

export function TasksPage() {
  const [user, isAuthLoading] = useAuthState(auth);

  if (isAuthLoading) {
    return null;
  }

  if (user) {
    return (
      <MainLayout>
        <TaskList />
      </MainLayout>
    );
  } else {
    return <Navigate to="/auth" replace />;
  }
}
