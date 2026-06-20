// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Footer.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Ícones primeiro -> vão para a esquerda */}
      <div className="footer__socials">
        <a href="https://github.com/RaizerTechDev" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/raizer-rafael/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      {/* Texto depois -> vai para a direita */}
      <p className="footer__text">© 2026 World Code Cup - Desenvolvido por Rafael</p>
    </footer>
  );
};

export default Footer;