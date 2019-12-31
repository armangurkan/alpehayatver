import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import LabeledText from '../client/components/LabeledText';
import MarketDisplay from '../client/components/MarketDisplay';
import MarketsDisplay from '../client/components/MarketsDisplay';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('LabeledText', () => {
    let wrapper;
    const props = {
      label: 'Mega',
      text: 'Markets',
    };

    beforeAll(() => {
      wrapper = shallow(<LabeledText {...props} />);
    });

    it('Renders a <p> tag with the label in bold', () => {
      expect(wrapper.type()).toEqual('p');
      expect(wrapper.text()).toEqual('Mega: Markets');
      expect(wrapper.find('strong').text()).toMatch('Mega');
    });
  });

  describe('MarketDisplay', () => {
    let mDisplay;
    const props = {
      index: '1',
      location: 'Azkaban',
      cards: '2',
      percentage: '50.00%',
      addCard: () => 'Clicked',  //jest.fn()
      deleteCard: () => 'Clicked',
    };
    beforeAll(() => {
      mDisplay = shallow(<MarketDisplay {...props} />);
    });
    // Test the following:
    // 1. A MarketDisplay should display all of its text props inside a
    // LabeledText component
    it('has all of its text props inside a LabeledText', () => {
      mDisplay.find(LabeledText).forEach(e => {
        expect(typeof e.prop('text')).toEqual('string');
      });
    });
    // 2. It should also contain a div with two buttons
    it('contains two buttons', () => {
      expect(mDisplay.find('div').find('button')).toHaveLength(2);
    });
    // 3. The functions passed down should be invoked on click
    it('the functions passed down should be invoked on click on both buttons', () => {
      // expect(mDisplay.)
      mDisplay.find('div').find('button').forEach(e => {
        expect(e.simulate('click').props().onClick()).toEqual('Clicked');
      });
      // mDisplay.find('div').find('button').forEach(e => {
      //   e.simulate('click');
      // });
      // expect(props.addCard).toHaveBeenCalled();
      // expect(props.deleteCard).toHaveBeenCalled();
    });
    // 4. MarketDisplay should render a div with a class of `marketBox`, and the
    it('renders one div with a class of marketBox AND another one with a class of flex', () => {
      mDisplay.find('div').forEach(e => {
        expect(e.prop('className') === 'flex' || e.prop('className') === 'marketBox').toEqual(true);
      });
    });
    // interior div wrapping the two buttons should have a class of `flex`
  });

  describe('MarketsDisplay', () => {
    let martsDisplay;
    const props = {
      totalCards: 120,
      marketList: [{ greeting: 'hello', cards: 0 }, { greeting: 'yo', cards: 60 }, { greeting: 'howdy', cards: 28 }],
    };
    beforeAll(() => {
      martsDisplay = shallow(<MarketsDisplay {...props} />);
    });
    // Test the following:
    //   1. A MarketsDisplay should have an h4 element to display the 'Markets'
    //   title
    it('contains an h4 element that has a text of \'Markets\'', () => {
      expect(martsDisplay.find('h4').text()).toEqual('Markets');
    });
    //   2. A single MarketDisplay is rendered for each market in the
    //   marketList prop
    it('has the same number of market displays as the length of the marketList array', () => {
      expect(martsDisplay.find(MarketDisplay).length === props.marketList.length).toEqual(true);
    });
    //   3. The percentage prop should be a string calculated to two decimals.
    //   Test for zero, a whole number, and a fractional value. (Right now this
    //   is implemented incorrectly, so follow TDD here)
    it('displays a percentage value rounded to the second decimal for each Market Display', () => {
      expect(martsDisplay.find(MarketDisplay).forEach(e => {
        expect(e.prop('percentage').toString().length - Math.floor(e.prop('percentage')).toString().length).toEqual(3);
      }));
    });
  });
});
