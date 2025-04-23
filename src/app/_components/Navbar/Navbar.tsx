
"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, State } from "@/app/_redux/store";
import { Button } from "@mui/material";
import { removeToken, setIsLoggedIn } from "@/app/_redux/authSlice";
import { useRouter } from "next/navigation";
import img from "../../../assets/images/icon-hamburger.svg"
const pages = [
  { page: "AllPosts", href: "/" },
  { page: "Profile", href: "/profile" },
  { page: "Add Post", href: "/createpost" },
];
const settings = {
  // isLoggedIn: ["LogOut"],
  isNotLoggedIn: [
    { page: "Login", href: "/login" },
    { page: "Register", href: "/register" },
  ],
};

export default function Navbar() {
  // const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isLoggedIn } = useSelector(
    (state: State) => state.authReducer
  );
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
  
const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logout() {
    dispatch(setIsLoggedIn(false));
    dispatch(removeToken());
    push("/login");
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
           component="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* { isLoggedIn  ? <Link href={"/"}> Circle</Link> : "Circle"} */}
            {mounted
    ? isLoggedIn
      ? <Link href="/">Circle</Link>
      : "Circle"
    : "Circle"}
          </Typography>

          { isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                    <Link href={page.href}>
                      <Typography sx={{ textAlign: "center" }}>
                        {page.page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            component="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {isLoggedIn ? <Link href={"/"}> Circle</Link> : "Circle"}
          </Typography>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.page} href={page.href}>
                  <Typography
                    sx={{ textAlign: "center", marginInline: "10px" }}
                  >
                    {page.page}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={img} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isLoggedIn &&
                settings.isNotLoggedIn.map((setting) => (
                  <MenuItem key={setting.page} onClick={handleCloseUserMenu}>
                    <Link
                      href={setting.href}
                      style={{ textAlign: "center", color: "#1976D2" }}
                    >
                      {setting.page}
                    </Link>
                  </MenuItem>
                ))}
              {isLoggedIn && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={logout}>LogOut</Button>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
