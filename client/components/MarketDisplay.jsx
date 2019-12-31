/**
 * ************************************
 *
 * @module  MarketDisplay
 * @author
 * @date
 * @description presentation component that renders a single box for each market
 *
 * ************************************
 */

import React from 'react';
import LabeledText from './LabeledText';

const MarketDisplay = ({
  index,
  location,
  cards,
  percentage,
  addCard,
  deleteCard,
}) => (
  <div className="marketBox">
    <LabeledText label="Market ID" text={index} />
    <LabeledText label="Location" text={location} />
    <LabeledText label="Cards" text={cards} />
    <LabeledText label="% of total" text={percentage} />
    <div className="flex">
      <button onClick={addCard}>+</button>
      <button onClick={deleteCard}>-</button>
    </div>
  </div>
);

export default MarketDisplay;
