import React from 'react';
import '../styles/button.scss';

export const Button = ({ isOutlined = false, ...otherProps}) => {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined': ''}`}
      {...otherProps} 
    />
  )
}