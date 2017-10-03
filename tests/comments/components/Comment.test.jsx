import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import Comment from '../../../source/comments/components/Comment';
import messages from '../../../source/messages.json';

const comment = {
  id: 1,
  email: 'cursos@platzi.com',
  name: 'Platzi Team',
  body: 'Este es un comentario de prueba',
};

test('Comment should rendered the component', () => {
  const tree = renderer.create(
    <IntlProvider locale="es" messages={messages.es}>
      <Comment {...comment} />
    </IntlProvider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
