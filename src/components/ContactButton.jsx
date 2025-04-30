import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react'; // Removed ChevronDown import


const ContactButton = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="button__int">
        <div className='flex items-center '>Let's Connect
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </div>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    background-image: linear-gradient(to right bottom, #8b0000, #b22222, #dc143c, #ff4500, #ff6347);
    border: none;
    font-size: 1.2em;
    border-radius: 1.5em;
    padding: 4px;
    transition: border-top-left-radius 0.2s ease-in, 
    border-top-right-radius 0.2s ease-in 0.15s, 
    border-bottom-right-radius 0.2s ease-in 0.3s,
    border-bottom-left-radius 0.2s ease-in 0.45s, 
    padding 0.2s ease-in;
    position: relative;
  }

  .button__int {
    background-color: #212121;
    color: white;
    border-radius: 1.3em;
    padding: 10px 40px;
    transition: all 0.2s ease-in,
    border-top-left-radius 0.2s ease-in, 
    border-top-right-radius 0.2s ease-in 0.15s, 
    border-bottom-right-radius 0.2s ease-in 0.3s,
    border-bottom-left-radius 0.2s ease-in 0.45s,
    padding 0.2s ease-in;
    font-weight: 600;
    z-index: -1;
    box-shadow:
  -15px -10px 30px -5px rgba(139, 0, 0, 0.8),      /* DarkRed */
  15px -10px 30px -5px rgba(178, 34, 34, 0.8),      /* Firebrick */
  15px 10px 30px -5px rgba(220, 20, 60, 0.8),       /* Crimson */
  -15px 10px 30px -5px rgba(255, 69, 0, 0.8);       /* OrangeRed */

  }

  .button:active .button__int {
    padding: 10px 30px;
  }

  .button:hover {
    border-radius: 0;
  }

  .button:hover .button__int {
    border-radius: 0;
  }

  .button:hover .button__int {
    box-shadow:
  -25px -10px 30px -5px rgba(139, 0, 0, 0.7),      /* DarkRed */
  25px -10px 30px -5px rgba(178, 34, 34, 0.7),     /* Firebrick */
  25px 10px 30px -5px rgba(220, 20, 60, 0.7),      /* Crimson */
  -25px 10px 30px -5px rgba(255, 69, 0, 0.7);      /* OrangeRed */

  }`;

export default ContactButton;
