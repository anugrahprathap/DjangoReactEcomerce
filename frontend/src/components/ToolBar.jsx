import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faList, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const ToolBar = ({ toggleSidebar }) => {
    return (
        <div className='toolbar font-size-small'>
            <div className='border-blink' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <FontAwesomeIcon icon={faBars} style={{ color: 'white', fontSize: '1.5rem',marginLeft:'1rem',marginRight:'.2rem'}} onClick={toggleSidebar}/>
                <span style={{ color: 'white', fontSize: '1.5rem',margin:'0'}}>All</span>
            </div>
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

const Layout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    const closeSidebar = () => {
        setSidebarExpanded(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="layout" style={{display:'flex'}}>
            {sidebarExpanded &&(
                <div ref={sidebarRef}>
                <SideNav expanded={sidebarExpanded} onToggle={setSidebarExpanded} className='sidebar-settings' style={{ background: 'white',color:'black' }}>
                    <Nav>
                    <Toggle onClick={toggleSidebar} style={{ position: 'fixed', top: '0', left: '230px', zIndex: '10' }} />
                        <NavItem eventKey="home" style={{background:'#0f1111'}}>
                            <NavIcon>
                                <FontAwesomeIcon icon={faHome} style={{ color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ color: 'white' }}>
                                Hello, User
                            </NavText>
                        </NavItem>
                        
                        <NavItem eventKey="about" className='mx-4 mt-4'>
                        
                            <NavText >
                                <b style={{ color: '#0f1111',fontSize:'20px' }}>Trending</b>
                            </NavText>
                            
                        </NavItem>
                        <NavItem eventKey="about" className='mx-4 my-0'>
                        
                            <NavText style={{ color: '#0f1111' }} >
                                Best Sellers
                            </NavText>
                            
                        </NavItem>
                        {/* <NavItem eventKey="about" className='mx-4'>
                        
                            <NavText style={{ color: '#0f1111' }} >
                                Best Sellers
                            </NavText>
                            
                        </NavItem> */}
                        <NavItem eventKey="about" className='mx-4'>
                        
                            <NavText style={{ color: '#0f1111' }} >
                                New Releases
                            </NavText>
                            
                        </NavItem>
                        <hr />
                        <NavItem eventKey="catogary" className='mx-4' >
                            
                            <NavText >
                             <b style={{ color: '#0f1111',fontSize:'20px' }}>Shop By catogary</b>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="about" className='mx-4 my-0'>
                        
                            <NavText style={{ color: '#0f1111' }} >
                                Best Sellers
                            </NavText>
                            
                        </NavItem>
                        <hr />

                        <NavItem eventKey="pages" style={{ color: '#0f1111' }}>
                            <NavIcon>
                                <FontAwesomeIcon icon={faList} style={{ color: '0f1111' }} />
                            </NavIcon>
                            <NavText style={{ color: '#0f1111' }}>
                                Pages
                            </NavText>
                            <NavItem eventKey="pages/page1">
                                <NavText>
                                    Page 1
                                </NavText>

                            </NavItem>
                            
                            <NavItem eventKey="pages/page2">
                                <NavText>
                                    Page 2
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="pages/page3">
                                <NavText>
                                    Page 3
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <hr />
                        
                        <hr />  
                    </Nav>
                </SideNav>
            </div>
            )

            }
            
            <ToolBar toggleSidebar={toggleSidebar} />
    
        </div>
    );
};

export default Layout;
