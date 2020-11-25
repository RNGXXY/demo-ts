import React from 'react';
import { Slider, Tooltip } from 'antd';
import { Com1Wrap } from './style';

const Com1 = () => {
  const marks = {
    0: '0°C',
    26: '26°C',
    37: {
      label: (
        <Tooltip title="sadas">
          <span>37°C</span>
        </Tooltip>
      ),
    },
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };
  return (
    <Com1Wrap>
      <Slider marks={marks} defaultValue={57} tooltipVisible />
      <div className="a"></div>
      <div className="b"></div>
    </Com1Wrap>
  );
};

export default Com1;
