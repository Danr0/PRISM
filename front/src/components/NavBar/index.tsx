import { Link } from 'react-router-dom';
import * as React from 'react';
import Routes, { RoutesNames } from '../../pages/routes';
import Logo from '../../assets/img/logo.png';
import {AppBar, Button, Typography, Toolbar, Grid} from "@material-ui/core";

import {useStyles} from "../../../style";

interface IProps {
  name: string;
}

const NavBar: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  return (
      <AppBar>
        <Toolbar className={classes.menu} >
            <img  src={Logo} alt="website logo" />
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
            >
          <Link  to={Routes.MAIL}>
              <Button className={classes.menu_item}>
                  {RoutesNames.MAIL}
              </Button>
          </Link>
                <Link  to={Routes.GROUPS}>
            <Button className={classes.menu_item}>
            {RoutesNames.GROUPS}
            </Button>
                </Link>
                <Link  to={Routes.ROOT}>
                <Button className={classes.menu_item}>
                        {RoutesNames.ROOT}
                </Button>
                </Link>
                <Link  to={Routes.PROFILE}>
            <Button className={classes.menu_item}>
            {RoutesNames.PROFILE}
            </Button>
                </Link>
                <Link  to={Routes.LOGIN}>
            <Button className={classes.menu_item}>
                {RoutesNames.LOGIN}
            </Button>
                </Link>
                <Link  to={Routes.REGISTER}>
            <Button className={classes.menu_item}>
                {RoutesNames.REGISTER}
            </Button>
                </Link>
            </Grid>
        </Toolbar>

      </AppBar>

  );
};

export default NavBar;
