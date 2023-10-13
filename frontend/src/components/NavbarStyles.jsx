import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    background: '#131921',
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'aqua',
    width: 620,
    height: 40,
  },
  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#febd68',
    width: 45,
    height: '100%',
    borderRadius: '4px 0 0 4px',
    color: '#0F1111',
  },
  inputInput: {
    width: '100%',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0 4px 4px 0',
  },
  navCart: {
    display: 'flex',
    fontSize: '0.85rem',
    fontWeight: 700,
  },
  navCartText: {
    alignSelf: 'flex-end',
  },
  link: {
    textDecoration: 'none',
    color: '#ffff',
  },
}));

export default useStyles;
