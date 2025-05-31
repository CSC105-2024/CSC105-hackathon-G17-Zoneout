import React from 'react';
import { Link } from 'react-router-dom';
// import your logo if you have one, e.g.:
// import Logo from '../Logo';

const Footer = () => (
  <footer
    className='flex flex-row items-center justify-between font-sans py-8 gap-4 px-8 md:px-16 lg:px-24 xl:px-40'
    style={{
      background: 'var(--footer-bg-color, #fff)',
      borderTop: '1px solid var(--footer-border-color, #eee)',
    }}
  >
    {/* Logo or App Name */}
    <Link to='/'>
      {/* <Logo className="w-14" /> */}
      <span className='text-2xl font-black text-[var(--color-accent,#6B21A8)] tracking-tight'>
        Zoneout
      </span>
    </Link>
    <p className='text-sm text-[var(--footer-text-color,#888)] font-medium text-center sm:text-left'>
      ©{new Date().getFullYear()} zoneout.com
    </p>
  </footer>
);

export default Footer;
