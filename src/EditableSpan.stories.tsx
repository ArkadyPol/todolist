import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import EditableSpan from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
  title: 'JS',
  changeTitle: action('Title changed'),
};
