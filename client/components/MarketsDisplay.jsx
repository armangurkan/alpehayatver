/**
 * ************************************
 *
 * @module  MarketsDisplay
 * @author
 * @date
 * @description presentation component that renders n MarketDisplay components
 *
 * ************************************
 */

import React from 'react';
import MarketDisplay from './MarketDisplay';

const percentOfTotal = (cardCount, total) => (
  total ? ((cardCount / total) * 100).toFixed(2) : 0.00);

const marketMaker = (market, idx, props) => (
  <MarketDisplay
    {...market}
    key={idx}
    percentage={percentOfTotal(market.cards, props.totalCards)}
    index={idx}
    addCard={() => props.addCard(idx)}
    deleteCard={() => props.deleteCard(idx)}
  />
);

const MarketsDisplay = props => (
  <div className="displayBox">
    <h4>Markets</h4>
    <div className="allMarkets">
      {props.marketList.map((market, idx) => marketMaker(market, idx, props))}
    </div>
  </div>
);

export default MarketsDisplay;
