import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ModeToggle } from '../ui/mode-toggle';
import Header from './Header';
import AddTaskModal from './AddTaskModal';
import { Toaster } from 'sonner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>
          <AddTaskModal />
          <Toaster duration={2000} expand={false} position="top-center" />
          {children}
          <ModeToggle />
        </ReactQueryProvider>
      </ThemeProvider>
    </>
  );
}
