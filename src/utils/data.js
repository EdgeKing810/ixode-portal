export const fetchData = () => ({
  navigation: [
    { name: "Home", icon: "home-4" },
    { name: "Projects", icon: "folder-3" },
    { name: "Configs", icon: "tools" },
    { name: "Users", icon: "user-3" },
    { name: "Sheet", icon: "compasses-2" },
  ],

  home: {
    blogPosts: [
      {
        id: "crud-api-todo",
        title: "Building a CRUD API for a ToDo App",
        description:
          "Learn how to build a simple CRUD API for a ToDo App using Kinesis API while using a JS Framework such as React on the Frontend.",
        href: "https://blog.konnect.dev/#/v/building-crud-todo-kinesis-api",
      },
      {
        id: "connecting-to-mongodb",
        title: "How to connect Kinesis API to MongoDB",
        description:
          "In this step by step tutorial, we will learn how to connect Kinesis API to MongoDB.",
        href: "https://blog.konnect.dev/#/v/connecting-to-mongodb",
      },
    ],

    bottomNav: [
      {
        id: "docs",
        link: "https://docs.kinesis.world",
        title: "Read the Documentation",
        description: "Discover the concepts, reference guides and tutorials.",
        icon: "book",
        color: "secondary",
      },
      {
        id: "examples",
        link: "https://docs.kinesis.world/#/examples",
        title: "Code Examples",
        description:
          "Learn by testing real projects developed by the community.",
        icon: "code-s-slash",
        color: "error",
      },
    ],

    sideNav: [
      {
        id: "github",
        link: "https://github.com/EdgeKing810/Kinesis-API",
        name: "GitHub",
        icon: "github",
        fill: true,
      },
      {
        id: "instagram",
        link: "https://www.instagram.com/kishan_takoordyal/",
        name: "Instagram",
        icon: "instagram",
        fill: false,
      },
      {
        id: "blog",
        link: "https://blog.konnect.dev",
        name: "Blog",
        icon: "stack",
        fill: false,
      },
    ],
  },
});
