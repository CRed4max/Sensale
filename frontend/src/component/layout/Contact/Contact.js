import React from 'react';
import './Contact.css';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Typography, Avatar } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Contact = () => {
  const visitInstagram1 = () => {
    window.location = 'https://www.instagram.com/boogeyman_slayer/';
  };
  const visitInstagram2 = () => {
    window.location = 'https://www.instagram.com/chhotelal4758/';
  };

  return (
    <div className='aboutSection'>
      <div></div>
      <div className='aboutSectionGradient'></div>
      <div className='aboutSectionContainer'>
        <Typography component='h1'>Contact Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src='/chhotelal.jpg'
              alt='Founder'
            />
            <h2>Chhote Lal Kumar</h2>
            <div className='icons'>
              <a
                href='https://www.linkedin.com/in/chhote-lal-kumar-2973a1207/'
                target='_blank'
              >
                <LinkedInIcon className='instagramSvgIcon' />
              </a>
              <a href='https://www.instagram.com/chhotelal4758/' target='blank'>
                <InstagramIcon className='instagramSvgIcon' />
              </a>
              <a href='https://github.com/cred4max' target='blank'>
                <GitHubIcon className='instagramSvgIcon' />
              </a>
              <a href='mailto:cred4max@gmail.com' target='blank'>
                <MailIcon className='instagramSvgIcon' />
              </a>
            </div>
            <span>
              A Computer Science student at MNIT Jaipur <br /> BTech 2023 Batch
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
