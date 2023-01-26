import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <nav>
          <ul>
            <li>
              <Link to='/quotes'>All Quotes</Link>
            </li>
            <li>
              <Link to='/add-quote'>Add a Quote</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header