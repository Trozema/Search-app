import React from 'react';
import renderer from 'react-test-renderer';
import TopNav from '../Components/TopNav';

it ("renders successfully", () => {
   const tree = renderer.create(<TopNav/>).toJSON();
   expect(tree).toMatchSnapshot()

})
