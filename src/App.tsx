import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { ReceiptExtraction } from './features';
import { Notifications } from '@mantine/notifications';

function App() {
  const theme = createTheme({
    fontFamily: 'PT Sans, sans-serif',
    primaryColor: 'cyan',
  });

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ReceiptExtraction />
    </MantineProvider>
  );
}

export default App;
