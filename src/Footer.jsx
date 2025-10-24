import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://web.facebook.com/?_rdc=1&_rdr#">
          <img src="/Icons/Facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/">
          <img src="/Icons/Instagram.svg" alt="Instagram" />
        </a>
        <a href="https://x.com/">
          <img src="/Icons/Twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/">
          <img src="/Icons/Youtube.svg" alt="YouTube" />
        </a>
      </div>

      <ul className="footer-links">
        <li>
          <a href="#">Conditions of Use</a>
        </li>
        <li>
          <a href="#">Privacy & Policy</a>
        </li>
        <li>
          <a href="#">Press Room</a>
        </li>
      </ul>

      <div className="footer-bottom">
        <p>&copy; 2025 MovieBox by Iyanu Adisa</p>
      </div>
    </footer>
  );
};

export default Footer;
