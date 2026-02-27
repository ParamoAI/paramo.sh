import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
        <div className="footer-left">
          <Link href="/" className="footer-brand">
            P<span className="accent">á</span>ramo
          </Link>
          <span className="footer-copy">© {currentYear} Páramo. Above the clouds.</span>
        </div>
        <ul className="footer-links">
          <li>
            <a href="https://discord.com/invite/xXE9TqGju" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </li>
          <li>
            <a href="https://x.com/tipbtdennis?s=21" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
