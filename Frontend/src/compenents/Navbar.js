import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

//Import Compenent
import PopoverSocial from "./PopoverSocial.js";
import BtnTrade from "./PopoverTrade.js";
import BtnFarm from "./BtnFarm.js";

//Import CSS
import * as s from "../styles/globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Verticals
          </Typography>
          <PopoverSocial>
          </PopoverSocial>
          <s.SpacerSmall>
          </s.SpacerSmall>
          <BtnTrade>
          </BtnTrade>
          <s.SpacerSmall>
          </s.SpacerSmall>
          <BtnFarm>
          </BtnFarm>
        </Toolbar>
      </AppBar>
    </div>
  );
}