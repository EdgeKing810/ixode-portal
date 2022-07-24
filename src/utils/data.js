export const fetchData = () => ({
  navigation: [
    { name: 'Home', icon: 'home-4', visibility: 'VIEWER,AUTHOR,ADMIN,ROOT' },
    {
      name: 'Projects',
      icon: 'folder-3',
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
      name: 'Sheet',
      icon: 'compasses-2',
      visibility: 'ADMIN,ROOT',
    },
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
      { id: 'text', name: 'TEXT', type: 'text', format: 'This is an example' },
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
      { id: 'uid', name: 'UID', type: 'text', format: 'abcd-efgh-ijkl-mnop' },
      {
        id: 'json',
        name: 'JSON',
        type: 'text',
        format: '{"name": "Kinesis", "address": { "planet": "API" }}',
      },
    ],
  },
});
