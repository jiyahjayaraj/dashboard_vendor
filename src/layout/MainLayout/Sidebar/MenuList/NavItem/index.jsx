import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/system';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level, lastItem }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const largeScreen = useMediaQuery('(min-width:1650px)');
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const isSelected = customization.isOpen.findIndex((id) => id === item.id) > -1;

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" sx={{ color: isSelected ? '#000000' : 'inherit' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isSelected ? 8 : 6,
        height: isSelected ? 8 : 6,
        color: isSelected ? '#000000' : 'inherit'
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (item) => {
    dispatch({ type: MENU_OPEN, item });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, item });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        paddingY: 0,
        paddingRight: 0,
  
        marginBottom: lastItem ===  item?.id ? '120px !important' : '6px',
        '&:hover': {
          backgroundColor: 'orange',
          marginRight: leftDrawerOpened ? 0 : '0px'
        },
        '&.Mui-selected': {
          backgroundColor: ' #fe7816 !important',
          marginRight: leftDrawerOpened ? 0 : '0px',
          color: '#FFFFFF'
        }
      }}
      selected={isSelected}
      onClick={() => itemHandler(item)}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: `${customization.borderRadius}px`,

          alignItems: 'center',
          gap: '10px',
          backgroundColor: isSelected ? ' #fe7816 !important' : 'transparent',
          py: level > 1 ? 1 : 1,
          px: leftDrawerOpened ? '' : 3,
          pl: `${level * 10}px`,
          ml: leftDrawerOpened ? 0 : -1,
          cursor: 'pointer',
          position: 'relative', 

          '& .MuiListItemIcon-root': {
            backgroundColor: isSelected ? 'white' : 'rgb(46, 25, 37)',
            borderRadius: '8px',
            p: 1,
            '& svg': {
              color: isSelected ? '#fe7816' : '#fe7816'
            }
          },

          
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: 0, 
            backgroundColor: '#fe7816',
            transition: 'width 0.3s ease' 
          },

          '&:hover': {
            backgroundColor: 'inherit !important',
            color: '#fe7816 !important',
            '&:after': {
              width: '100%' 
            },
            '& .MuiListItemIcon-root': {
              backgroundColor: 'white',
              '& svg': {
                color: '#000000 !important'
              }
            }
          }
        }}
      >
        <ListItemIcon
          sx={{
            my: 'auto',
            marginRight: leftDrawerOpened ? '-2px' : 2,
            marginLeft: leftDrawerOpened ? '' : largeScreen ? 0 : -0.4,
            minWidth: !item?.icon ? 18 : 36,
            borderRadius: '8px',
            p: 1
          }}
        >
          {itemIcon}
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              variant={isSelected ? (largeScreen ? 'selectedSideMenu' : 'h5') : largeScreen ? 'sideMenu' : 'body1'}
              sx={{ fontSize: '14px', fontWeight: 400 }}
              color={isSelected ? 'white' : 'inherit'}
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
                color={isSelected ? '#000000' : 'inherit'}
              >
                {item.caption}
              </Typography>
            )
          }
        />
        {item.chip && (
          <Chip
            color={'#fff'}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </Box>

      {leftDrawerOpened && (
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="0.081"
          height="0.025"
          viewBox="0 0 0.3 0.2"
          sx={{
            marginLeft: '0px',
            visibility: isSelected ? 'visible' : 'hidden',
            display: 'block'
          }}
        >
          <path d="M0.3,0 Q0,0.1 0.3,0.2 Z" fill="white" />
        </Box>
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
