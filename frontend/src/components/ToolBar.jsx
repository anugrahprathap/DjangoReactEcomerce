import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const ToolBar = () => {
    return (
        <div className='toolbar font-size-small'>
            <div className='border-blink'style={{display:'flex',alignItems:'center    ',justifyContent:'center'}}>
            <FontAwesomeIcon icon={faBars} style={{ color: 'white', fontSize: '1.5rem',marginLeft:'1rem',marginRight:'.2rem'}}/>
            <div></div>
            <span style={{ color: 'white', fontSize: '1.5rem',margin:'0'}}>All</span>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-button'>
                   Prime
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Item 1</Dropdown.Item>
                    <Dropdown.Item href="#">Item 2</Dropdown.Item>
                    <Dropdown.Item href="#">Item 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <span className='border-blink' style={{ color: 'white'}}>
                Fashion
            </span>
            <span className='border-blink' style={{ color: 'white'}}>
                New Releases
            </span>
            <span className='border-blink' style={{ color: 'white'}}>
                Customer Service
            </span>
            <span className='border-blink' style={{ color: 'white'}}>
                Best Sellers
            </span>
            <span className='border-blink' style={{ color: 'white'}}>
                Home & Kitchen
            </span>
        </div>
    );
};

const Sidebar = () => {
    
    return (
        <>
            
        </>
        
    );
};

const Layout = () => {
    return (
        <div className="layout" style={{display:'flex'}}>
            <Sidebar />
            <ToolBar />
        </div>
    );
};

export default Layout;
