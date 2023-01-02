import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SearchBar from './SearchBar';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { useAppSelector } from '../store/hooks';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useGetUserDetailsQuery } from '../features/auth/authApiSlice';
import ProfileMenu from './ProfileMenu';
import AddIcon from '@mui/icons-material/Add';

interface Props {
	window?: () => Window;
}

const drawerWidth = 200;


export default function Navbar(props: Props) {
    const token = useAppSelector(selectCurrentToken);
    const user = useGetUserDetailsQuery();

    const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
    
	const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
	};

	// {name: <MarkUnreadChatAltIcon />, to: "/chat"},
    const navLogItems = [{name: <Fab variant="extended" size="medium" color="primary" aria-label="add">
		<AddIcon sx={{ mr: 1 }} />
		Sell
	</Fab>, to: "/sell"}];
    const navLoggedOutItems = [{name: 'Login', to: "/login"}, {name: "Sell", to: "/login"}];
    const navItems = token ? navLogItems : navLoggedOutItems;

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
                <NavLink to = "/">
                    <img src='/images/logo.png' style={{ width: "60px", height: "60px",paddingTop:'10px' }} />
                </NavLink>
			</Typography>
			<Divider />
			<List>
				{navItems.map((item, i) => (
					<NavLink key={i} to={item.to} style={{ textDecoration: "none", color: 'black' }}>
						<ListItem disablePadding>
							<ListItemButton sx={{ textAlign: 'center' }}>
								<ListItemText primary={item.name} />
							</ListItemButton>
						</ListItem>
					</NavLink>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<nav>
			<AppBar component="nav" style={{ position: "static", backgroundColor: "rgba(242, 232, 41, 0.5)", boxShadow: "2px 2px 8px grey" }}>
				<Toolbar style = {{paddingRight: "0px"}}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
	
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'white', fontWeight: "bold" }}
					>
						<NavLink to = "/">
                            <img src='/images/logo.png' style={{ width: "60px", height: "60px" }} />
                        </NavLink>
					</Typography>

					<SearchBar />

					{
						token ? 
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' }, color: 'white', fontWeight: "bold", textAlign: "right" }}
						>
							<Button>
								<ProfileMenu />
							</Button>
						</Typography> : null
					}

					<Box sx={{ display: { xs: 'none', sm: 'block' }}}>
						{navItems.map((item, i) => (
							<NavLink to={item.to} key={i} className = "btn" style={{ textDecoration: "none",  color: 'black', fontWeight: "bold", padding: "8px"}}>
								{item.name}
							</NavLink>
						))}

						{
							token ? 
							<Button>
								<ProfileMenu />
							</Button> : null
						}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</nav>
	);
}