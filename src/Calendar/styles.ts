import { styled } from '@mui/system';
import { Container as MuiContainer, Paper as MuiPaper } from '@mui/material';

const Container = styled(MuiContainer)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 'auto',
  padding: 24,
});

const SubContainer = styled(MuiPaper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minWidth: '960px',
});

export { Container, SubContainer };
