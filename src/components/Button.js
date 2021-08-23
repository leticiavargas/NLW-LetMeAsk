import React from 'react';
import '../styles/button.scss';

export const Button = ({...otherProps}) => {
  return (
    <button className="button" {...otherProps} />
  )
}