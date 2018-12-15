import * as path from 'path';
import { folderExists } from '../utils';
import { addModuleToRoutes, addModuleToState } from '../ast';

export = {
  description: 'Add a module with VueX store and routes',
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
      name: 'wantRoutes',
      default: true,
      message: 'Do you want routes?',
    },
    {
      type: 'confirm',
      name: 'wantVuex',
      default: true,
      message: 'Do you want vuex?',
    },
  ],
  actions: (data: any) => {
    const filePath: string[] = data.name.split('/');

    data.moduleName = filePath.pop();
    data.componentName = data.moduleName;
    data.basePath = path.resolve(process.cwd(), 'src/app/', filePath.join('/'));

    let actions: any[] = [
      {
        type: 'add',
        path: '{{basePath}}/{{camelCase moduleName}}/{{properCase componentName}}/{{properCase componentName}}.vue',
        templateFile: '../../src/generators/connected/connected.vue.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '{{basePath}}/{{camelCase moduleName}}/{{properCase componentName}}/{{properCase componentName}}.spec.ts',
        templateFile: '../../src/generators/connected/connected.spec.ts.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantRoutes) {
      actions.push({
        type: 'add',
        path: '{{basePath}}/{{camelCase moduleName}}/routes.ts',
        templateFile: '../../src/generators/module/routes.ts.hbs',
        abortOnFail: true,
      });

      addModuleToRoutes(path.join(path.resolve(process.cwd()), 'src', 'app', 'router.ts'), data.moduleName);
    }

    if (data.wantVuex) {
      actions = actions.concat([
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/actions.spec.ts',
          templateFile: '../../src/generators/module/actions.spec.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/actions.ts',
          templateFile: '../../src/generators/module/actions.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/getters.spec.ts',
          templateFile: '../../src/generators/module/getters.spec.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/getters.ts',
          templateFile: '../../src/generators/module/getters.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/module.ts',
          templateFile: '../../src/generators/module/module.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/mutations.spec.ts',
          templateFile: '../../src/generators/module/mutations.spec.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/mutations.ts',
          templateFile: '../../src/generators/module/mutations.ts.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{basePath}}/{{camelCase moduleName}}/state.ts',
          templateFile: '../../src/generators/module/state.ts.hbs',
          abortOnFail: true,
        },
      ]);

      addModuleToState(path.join(path.resolve(process.cwd()), 'src', 'app', 'state.ts'), data.moduleName);
    }

    return actions;
  },
};
