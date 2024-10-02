import ThemeProvider from './contexts/themeProvider';
import Form from './components/form';
import Button from './components/button';

export default function App() {
  return (
    <ThemeProvider>
      <Form />
      <Button>Toggle Theme</Button>
    </ThemeProvider>
  );
}