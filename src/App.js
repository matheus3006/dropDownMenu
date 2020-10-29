import React, { useState,useEffect,useRef,CSSTransition } from 'react';

import './App.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

function App() {
  return (
      <Navbar>
        <NavItem icon={<PlusIcon/>} />
        <NavItem icon={<BellIcon/>} />
        <NavItem icon={<MessengerIcon/>} />

        <NavItem icon={<CaretIcon/>}> 
        {/* DropDown goes Here */}
            <DropDownMenu/>
        </NavItem>
        
      </Navbar>
    )
}


function Navbar(props){
  return(
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props){
  const [open, setOpen ] = useState(false);

  return(
    <li className="nav-item">
      <a href="#" className="icon-button" 
      onClick={()=> setOpen(!open)}>
         {props.icon} 
      </a>
    {open && props.children}
    </li>
  );
}


function DropDownMenu(){
  const [activeMenu, setActiveMenu] = useState('main');
  const[ menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
   
  }, []);

  function calcHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

    function DropDownItem(props){
      return(
        <a href="#" className="menu-item"
        onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>{props.children}
        <span className="icon-right">{props.righIcon}</span>
        </a>
    );
  }
return(
  <div className="dropdown" style={{height:menuHeight}}
  ref={dropdownRef}>

    <CSSTransition in={activeMenu === 'main'}
    timeout = {500}
    className="menu-primary"
    unmountOnExit
    onEnter={calcHeight}>
      <div className="menu">
        <DropDownItem>My Profile</DropDownItem>
        <DropDownItem
        leftIcon = {<CogIcon/>}
        rightIcon = {<ChevronIcon/>}
        goToMenu = 'settings'
        >
        Settings
        </DropDownItem>

        <DropDownItem
        leftIcon = "🦧"
        rightIcon = {<ChevronIcon/>}
        goToMenu = 'animals'
        >
          Animals
        </DropDownItem>
      </div>
    </CSSTransition>
  


  
  </div>

)

}


export default App;
