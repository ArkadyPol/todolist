import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Task from './Task';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TODOLISTS/Task',
  component: Task,
  args: {
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
  }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
  task: {isDone: true, id: '11', title: 'JS'},
  todoListID: '1',
};
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
  task: {isDone: false, id: '12', title: 'JS'},
  todoListID: '1',
};
