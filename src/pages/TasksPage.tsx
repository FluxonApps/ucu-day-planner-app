import MainLayout from '../components/layout/MainLayout';
import { TaskList } from '../components/TaskList';

export function TasksPage() {
  return (
    <MainLayout>
      <TaskList />
    </MainLayout>
  );
}
