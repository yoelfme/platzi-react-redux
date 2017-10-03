import reducer from '../source/reducer';
import actions from '../source/actions';

test('reducer - SET_COMMENTS', (done) => {
  expect(
    reducer(
      undefined,
      actions.setComments([{ id: 1 }, { id: 2 }]),
    ),
  ).toMatchSnapshot();

  done();
});
