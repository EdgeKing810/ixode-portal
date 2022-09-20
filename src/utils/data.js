export const fetchData = () => ({
  navigation: [
    {
      name: 'Home',
      icon: 'home-4',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    {
      name: 'Projects',
      icon: 'folder-3',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    {
      name: 'Data',
      icon: 'database-2',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    {
      name: 'Routes',
      icon: 'route',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    { name: 'Configs', icon: 'tools', visibility: 'ROOT' },
    { name: 'Users', icon: 'user-3', visibility: 'ROOT' },
    {
      name: 'Profile',
      icon: 'user-settings',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    {
      name: 'Media',
      icon: 'camera',
      visibility: 'VIEWER,AUTHOR,ADMIN,ROOT',
    },
    {
      name: 'Misc',
      icon: 'stack',
      visibility: 'ADMIN,ROOT',
    },
    {
      name: 'Events',
      icon: 'history',
      visibility: 'ADMIN,ROOT',
    },
    // {
    //   name: 'Sheet',
    //   icon: 'compasses-2',
    //   visibility: 'ADMIN,ROOT',
    // },
  ],

  home: {
    blogPosts: [
      {
        id: 'crud-api-todo',
        title: 'Building a CRUD API for a ToDo App',
        description:
          'Learn how to build a simple CRUD API for a ToDo App using Kinesis API while using a JS Framework such as React on the Frontend.',
        href: 'https://blog.konnect.dev/#/v/building-crud-todo-kinesis-api',
      },
      {
        id: 'connecting-to-mongodb',
        title: 'How to connect Kinesis API to MongoDB',
        description:
          'In this step by step tutorial, we will learn how to connect Kinesis API to MongoDB.',
        href: 'https://blog.konnect.dev/#/v/connecting-to-mongodb',
      },
    ],

    bottomNav: [
      {
        id: 'docs',
        link: 'https://docs.kinesis.world',
        title: 'Read the Documentation',
        description: 'Discover the concepts, reference guides and tutorials.',
        icon: 'book',
        color: 'secondary',
      },
      {
        id: 'examples',
        link: 'https://docs.kinesis.world/#/examples',
        title: 'Code Examples',
        description:
          'Learn by testing real projects developed by the community.',
        icon: 'code-s-slash',
        color: 'error',
      },
    ],

    sideNav: [
      {
        id: 'github',
        link: 'https://github.com/EdgeKing810/Kinesis-API',
        name: 'GitHub',
        icon: 'github',
        fill: true,
      },
      {
        id: 'instagram',
        link: 'https://www.instagram.com/kishan_takoordyal/',
        name: 'Instagram',
        icon: 'instagram',
        fill: false,
      },
      {
        id: 'blog',
        link: 'https://blog.konnect.dev',
        name: 'Blog',
        icon: 'stack',
        fill: false,
      },
    ],
  },

  structures: {
    types: [
      {
        id: 'text',
        name: 'TEXT',
        type: 'text',
        format: 'This is an example',
      },
      {
        id: 'email',
        name: 'EMAIL',
        type: 'email',
        format: 'example@kinesis.world',
      },
      {
        id: 'password',
        name: 'PASSWORD',
        type: 'password',
        format: 'sUpérS3cr3t*',
      },
      {
        id: 'markdown',
        name: 'MARKDOWN',
        type: 'markdown',
        format:
          '# Hello World <br/> [Link to the docs](https://docs.kinesis.world)',
      },
      { id: 'number', name: 'NUMBER', type: 'number', format: '69' },
      {
        id: 'enum',
        name: 'ENUM',
        type: 'text',
        format: 'apple, orange, banana',
      },
      {
        id: 'date',
        name: 'DATE',
        type: 'date',
        format: '2022-07-23',
      },
      {
        id: 'datetime',
        name: 'DATETIME',
        type: 'datetime-local',
        format: '2022-07-23 15:40:43 +04:00',
      },
      {
        id: 'media',
        name: 'MEDIA',
        type: 'custom-media',
        format: 'https://api.kinesis.world/public/summer.jpg',
      },
      { id: 'boolean', name: 'BOOLEAN', type: 'checkbox', format: '☑️' },
      {
        id: 'uid',
        name: 'UID',
        type: 'text',
        format: 'abcd-efgh-ijkl-mnop',
      },
      {
        id: 'json',
        name: 'JSON',
        type: 'text',
        format: '{"name": "Kinesis", "address": { "planet": "API" }}',
      },
    ],
  },

  events: [
    { type: 'config_create', logo: 'tools;add' },
    { type: 'config_update', logo: 'tools;settings-2' },
    { type: 'config_delete', logo: 'tools;delete-bin-2' },
    { type: 'user_create', logo: 'user-3;add' },
    { type: 'user_register', logo: 'user-3;add' },
    { type: 'user_role_update', logo: 'user-3;star' },
    { type: 'user_delete', logo: 'user-3;delete-bin-2' },
    { type: 'project_create', logo: 'folder-3;add' },
    { type: 'project_update_id', logo: 'folder-3;settings-2' },
    { type: 'project_update_name', logo: 'folder-3;settings-2' },
    { type: 'project_update_description', logo: 'folder-3;settings-2' },
    { type: 'project_update_api_path', logo: 'folder-3;settings-2' },
    { type: 'project_delete', logo: 'folder-3;delete-bin-2' },
    { type: 'project_add_member', logo: 'folder-3;user-add' },
    { type: 'project_remove_member', logo: 'folder-3;user-unfollow' },
    { type: 'collection_create', logo: 'file;add' },
    { type: 'collection_update_id', logo: 'file;settings-2' },
    { type: 'collection_update_name', logo: 'file;settings-2' },
    { type: 'collection_update_description', logo: 'file;settings-2' },
    { type: 'collection_delete', logo: 'file;delete-bin-2' },
    { type: 'structure_create', logo: 'car;add' },
    { type: 'structure_create_custom', logo: 'taxi;add' },
    { type: 'structure_update', logo: 'car;settings-2' },
    { type: 'structure_update_custom', logo: 'taxi;settings-2' },
    { type: 'structure_delete', logo: 'car;delete-bin-2' },
    { type: 'structure_delete_custom', logo: 'taxi;delete-bin-2' },
    { type: 'custom_structure_create', logo: 'truck;add' },
    { type: 'custom_structure_update', logo: 'truck;settings-2' },
    { type: 'custom_structure_delete', logo: 'truck;delete-bin-2' },
    { type: 'data_create', logo: 'database-2;add' },
    { type: 'data_update', logo: 'database-2;settings-2' },
    { type: 'data_delete', logo: 'database-2;delete-bin-2' },
    { type: 'data_publish', logo: 'database-2;star' },
    { type: 'route_create', logo: 'route;add' },
    { type: 'route_update', logo: 'route;settings-2' },
    { type: 'route_delete', logo: 'route;delete-bin-2' },
  ],
});
