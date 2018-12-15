import * as path from 'path';
import { folderExists } from '../utils';

export = {
  description: 'Add a single file component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return 'name is required';
        }

        return folderExists(value) ? `folder already exists (${value})` : true;
      },
    },
    {
      type: 'confirm',
      name: 'storybook',
      default: true,
      message: 'Do you want a storybook?',
    },
  ],
  actions: (data: any) => {
    const filePath: string[] = data.name.split('/');

    data.componentName = filePath.pop();
    data.basePath = path.resolve(process.cwd(), 'src/app/', filePath.join('/'));

    const actions: any[] = [
      {
        type: 'add',
        path: '{{basePath}}/{{properCase componentName}}/{{properCase componentName}}.vue',
        templateFile: '../../src/generators/component/component.vue.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '{{basePath}}/{{properCase componentName}}/{{properCase componentName}}.spec.ts',
        templateFile: '../../src/generators/component/component.spec.ts.hbs',
        abortOnFail: true,
      },
    ];

    if (data.storybook) {
      actions.push({
        type: 'add',
        path: '{{basePath}}/{{properCase componentName}}/{{properCase componentName}}.stories.ts',
        templateFile: '../../src/generators/component/component.stories.ts.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
