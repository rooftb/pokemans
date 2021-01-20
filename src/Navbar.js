import React, { useState, useContext } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
} from 'shards-react';
import { AppContext, AppProvider } from './AppContext';

export default function NavBar(props) {
  const context = useContext(AppContext);

  return (
    <Navbar
      className='mb-2 d-flex align-self-center'
      type='light'
      theme='light'
      expand='md'
    >
      <NavbarBrand href='#'>Pokédex</NavbarBrand>
      <Nav>
        <select onChange={(e) => context.toggleNums(e)}>
          <option value={[151, 0]}>Gen I. 1-151</option>
          <option value={[100, 151]}>Gen II. 152-251</option>
          <option value={[135, 251]}>Gen III. 252-386</option>
        </select>
      </Nav>
    </Navbar>
  );
}
