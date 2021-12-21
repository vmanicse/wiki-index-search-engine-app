import React from 'react';
import Icons from './icons';

export default function Footer() {
  return (
    <footer>
      Designed &amp; Developed by{' '}
      <a href="https://github.com/vmanicse" target="_blank">
        <Icons iconName="faGithub" /> V.Manikandan
      </a>{' '}
      | Powered By{' '}
      <a href="https://www.wikipedia.org/" target="_blank">
        Wikipedia
      </a>
    </footer>
  );
}
