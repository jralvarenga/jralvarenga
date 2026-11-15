/**
 * English copy, the source locale. Every key here must exist in `es.ts`,
 * and better-translate types both files against this one, so a missing or
 * extra key is a type error. `{name}` style placeholders are typed params.
 */
export const en = {
  meta: {
    defaultTitle: '{name} · {title}',
    aboutTitle: 'About · {name}',
    projectsTitle: 'Projects · {name}',
    projectTitle: '{project} · Projects · {name}',
    skillsTitle: 'Skills · {name}',
    skillTitle: '{skill} · Skills · {name}',
    notFoundTitle: 'Not found · {name}',
  },
  nav: {
    label: 'Main',
    home: '{name}, home',
    skip: 'Skip to content',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    breadcrumb: 'Breadcrumb',
  },
  footer: {
    license: 'MIT License',
  },
  settings: {
    language: 'Language: {language}',
    theme: 'Theme: {current}. Switch to {next}',
    themes: {
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
  },
  common: {
    inProgress: 'In progress',
  },
  profile: {
    greeting: "Hi, I'm",
    title: 'Software Engineer',
    headline:
      "I'm a senior software engineer and a tech lead, currently working at {organization} as a Tech Lead Developer.",
    sideProjectsIntro: 'I also work on my own projects like',
    sideProjectsJoin: 'and',
    summary:
      'More than six years building web and mobile products, from frontend architecture to APIs, databases, and infrastructure. These days I lead development at Denzo Studios, in El Salvador.',
    aboutLead: 'Engineer, tech lead, and builder of my own products.',
    aboutRole: 'a fullstack software engineer and {role}',
    aboutBody: {
      first:
        'I work on both ends of a product, on the web and on mobile, most of my time goes into planning and building apps, then the APIs and databases behind them, SQL or NoSQL depending on what the product needs.',
      second:
        "I've worked on a lot of different kinds of products over the years, that taught me to look at a problem from the frontend and the backend before I pick a solution, instead of forcing everything into the tools I already know.",
    },
    aboutSkills: {
      before:
        "I like learning, so I'm usually trying something new, lately that's coding agents and I share the rules I give them as open ",
      label: 'skills',
      after: '',
    },
  },
  home: {
    about: 'ABOUT',
    projects: 'PROJECTS',
    readMore: 'Read more about me →',
    allProjects: 'All projects →',
  },
  about: {
    title: 'About me',
    intro: {
      im: "I'm",
      at: 'at',
      basedIn: 'based in',
    },
    experience: 'MY EXPERIENCE',
    tools: 'TOOLS',
    at: 'at',
    ongoing: '{start} – now',
    organizations: {
      denzo: 'Denzo Studios',
      caban: 'Caban',
      fiverr: 'Fiverr and other freelance projects',
      uca: 'UCA',
      elSalvador: 'El Salvador',
    },
    chapters: {
      denzoLead: {
        role: 'Tech Lead',
        story:
          'I lead technical development across frontend, backend, database design, and infrastructure. I set development standards, make architecture calls, and turn business requirements into reliable products.',
      },
      cabanLead: {
        role: 'Frontend Engineer Lead',
        story:
          "I led frontend delivery for Caban's web apps: the architecture, implementation, deployment, and performance with React, Next.js, and Tailwind CSS, plus the code reviews and the technical direction with other teams.",
      },
      cabanEngineer: {
        role: 'Software Engineer',
        story:
          'I joined as a fullstack engineer, building web apps for both users and the business with React, Next.js, Auth0, Laravel, and Django.',
      },
      freelance: {
        role: 'Freelancing',
        story:
          'Where it started: React-focused apps, built with different teams.',
      },
      uca: {
        role: 'Mechanical Engineering',
        story: 'Studied at Universidad Centroamericana José Simeón Cañas.',
      },
    },
    toolGroups: {
      stack: 'My current stack',
      infrastructure: 'Infrastructure',
      ai: 'AI and tools',
    },
  },
  projects: {
    title: 'Projects',
    lead: "Products, tools, and libraries I've built or am building.",
    all: 'ALL PROJECTS',
    crumb: 'projects',
    started: 'Started {month}',
    about: 'ABOUT',
    parts: 'PARTS',
    stack: 'STACK',
  },
  skills: {
    title: 'Skills',
    lead: 'The rules I give coding agents, from how to write code to how to review it.',
    intro:
      'They work with Claude Code, Codex, Cursor, and any agent that supports the Agent Skills format.',
    crumb: 'skills',
    installation: 'INSTALLATION',
    list: 'SKILLS',
    empty: 'No skills yet.',
    countOne: '{count} skill',
    countOther: '{count} skills',
    source: 'Source',
    copy: 'Copy command',
    copied: 'Copied',
    copyFailed: 'Copy failed',
  },
  notFound: {
    title: 'Not found',
    lead: 'There is nothing here, stop sniffing around.',
    home: 'Home',
  },
} as const;
