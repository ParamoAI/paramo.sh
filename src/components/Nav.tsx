'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CALENDLY_URL } from '@/config/site';

interface NavProps {
  activeLink?: string;
}

export default function Nav({ activeLink }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="container">
        <Link href="/" className="logo">
          <img src="/assets/mark-bright-dark.svg" alt="Páramo" className="logo-mark" />
          P<span className="accent">á</span>ramo
        </Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="/#services" onClick={closeMenu}>Services</a></li>
          <li><a href="/#process" onClick={closeMenu}>Process</a></li>
          <li><a href="/#results" onClick={closeMenu}>Results</a></li>
          <li><a href="/#pricing" onClick={closeMenu}>Pricing</a></li>
          <li>
            <Link href="/case-studies" className={activeLink === 'case-studies' ? 'active' : ''} onClick={closeMenu}>
              Case Studies
            </Link>
          </li>
          <li>
            <Link href="/blog" className={activeLink === 'blog' ? 'active' : ''} onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={closeMenu}>
              Book a Call
            </a>
          </li>
        </ul>
        <button 
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`} 
          aria-label="Menu" 
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
