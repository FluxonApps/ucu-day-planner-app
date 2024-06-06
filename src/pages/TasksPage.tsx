import MainLayout from '../components/layout/MainLayout';
import { TaskList } from '../components/TaskList';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const auth = getAuth();


export function TasksPage() {

  const [user] = useAuthState(auth);

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
