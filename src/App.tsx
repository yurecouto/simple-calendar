import { styled } from '@mui/system';
import Calendar from './Calendar';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./theme";
import { ptBR } from "@mui/x-data-grid";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR as pickersPtBR } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { generateMockEvents } from './Calendar/utils/generateMockEvents';

const theme = createTheme(AppTheme, ptBR, pickersPtBR, corePtBR);

const Container = styled("div")({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%",
  height: '100vh',
});

const mockEvents = generateMockEvents();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Container>
          <Calendar eventArray={mockEvents}/>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
