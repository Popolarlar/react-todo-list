import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
    textAlign: "center",
    flexGrow: 1,
    color: "white",
    [theme.breakpoints.up("md")]: {
      textAlign: "start",
    },
  },
  sectionDesktop: {
    display: "none",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    position: "absolute",
    right: "0px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function MenuAppBar() {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link href="mailto:ming.jin.yeh@gmail.com" color="inherit">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <EmailIcon />
          </IconButton>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href="https://www.linkedin.com/in/ming-jin-yeh/"
          color="inherit"
          target="_blank"
          rel="noopener"
        >
          <IconButton aria-label="show 4 new mails" color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          href="https://github.com/Popolarlar"
          color="inherit"
          target="_blank"
          rel="noopener"
        >
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <GitHubIcon />
          </IconButton>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Todo List
          </Typography>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <Link href="mailto:ming.jin.yeh@gmail.com" color="inherit">
              <IconButton aria-label="show 4 new mails" color="inherit">
                <EmailIcon />
              </IconButton>
            </Link>
            <Link
              href="https://www.linkedin.com/in/ming-jin-yeh/"
              color="inherit"
              target="_blank"
              rel="noopener"
            >
              <IconButton aria-label="show 4 new mails" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Link>
            <Link
              href="https://github.com/Popolarlar"
              color="inherit"
              target="_blank"
              rel="noopener"
            >
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </Link>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon color="action" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}

export default MenuAppBar;
