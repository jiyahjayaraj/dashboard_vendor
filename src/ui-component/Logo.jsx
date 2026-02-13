import React from 'react';
import NavLogo from 'assets/images/logo.png';

function Logo() {
  return (
    <div>
      <img src={NavLogo} alt="FSD" loading="lazy" height={50} />
    </div>
  );
}

export default Logo;
