/**
 * Spanish copy, neutral Latin American Spanish. Same keys and placeholders
 * as `en.ts`; product, company, and tech names stay as they are.
 */
export const es = {
  meta: {
    defaultTitle: '{name} · {title}',
    aboutTitle: 'Sobre mí · {name}',
    projectsTitle: 'Proyectos · {name}',
    projectTitle: '{project} · Proyectos · {name}',
    skillsTitle: 'Skills · {name}',
    skillTitle: '{skill} · Skills · {name}',
    notFoundTitle: 'No encontrado · {name}',
  },
  nav: {
    label: 'Principal',
    home: '{name}, inicio',
    skip: 'Saltar al contenido',
    about: 'Sobre mí',
    projects: 'Proyectos',
    skills: 'Skills',
    breadcrumb: 'Ruta de navegación',
  },
  footer: {
    license: 'Licencia MIT',
  },
  settings: {
    language: 'Idioma: {language}',
    theme: 'Tema: {current}. Cambiar a {next}',
    themes: {
      system: 'Sistema',
      light: 'Claro',
      dark: 'Oscuro',
    },
  },
  common: {
    inProgress: 'En progreso',
  },
  profile: {
    greeting: 'Hola, soy',
    title: 'Ingeniero de software',
    headline: 'Soy {role} en el equipo de desarrollo de {organization}.',
    featuredWorkIntro: 'Trabajo en distintos proyectos, como',
    featuredWorkOutro: 'y muchos otros.',
    sideNote: 'También construyo mis propios proyectos por mi cuenta.',
    summary:
      'Más de seis años construyendo productos web y móviles, desde la arquitectura frontend hasta APIs, bases de datos e infraestructura. Hoy lidero el desarrollo en Denzo Studios, en El Salvador.',
    aboutLead: 'Ingeniero, tech lead y creador de mis propios productos.',
    aboutRole: 'ingeniero de software fullstack y {role}',
    aboutBody: {
      first:
        'Trabajo en los dos extremos de un producto, en web y en móvil. La mayor parte de mi tiempo se va en planificar y construir apps, y luego las APIs y bases de datos detrás de ellas, SQL o NoSQL según lo que necesite el producto.',
      second:
        'Con los años he trabajado en muchos tipos de productos, y eso me enseñó a ver un problema desde el frontend y desde el backend antes de elegir una solución, en lugar de forzarlo todo a las herramientas que ya conozco.',
    },
    aboutSkills: {
      before:
        'Me gusta aprender, así que casi siempre estoy probando algo nuevo. Últimamente son los agentes de código, y comparto las reglas que les doy como ',
      label: 'skills',
      after: ' de código abierto.',
    },
  },
  home: {
    about: 'SOBRE MÍ',
    projects: 'PROYECTOS',
    readMore: 'Más sobre mí →',
    allProjects: 'Todos los proyectos →',
  },
  about: {
    title: 'Sobre mí',
    intro: {
      im: 'Soy',
      at: 'en',
      basedIn: 'y vivo en',
    },
    experience: 'MI EXPERIENCIA',
    tools: 'HERRAMIENTAS',
    at: 'en',
    ongoing: '{start} – actualidad',
    organizations: {
      denzo: 'Denzo Studios',
      caban: 'Caban',
      fiverr: 'Fiverr y otros proyectos freelance',
      uca: 'UCA',
      elSalvador: 'El Salvador',
    },
    chapters: {
      denzoLead: {
        role: 'Tech Lead',
        story:
          'Lidero el desarrollo técnico de frontend, backend, diseño de bases de datos e infraestructura. Defino los estándares de desarrollo, tomo las decisiones de arquitectura y convierto los requerimientos del negocio en productos confiables.',
      },
      cabanLead: {
        role: 'Líder de Ingeniería Frontend',
        story:
          'Lideré el frontend de las apps web de Caban: la arquitectura, la implementación, el despliegue y el rendimiento con React, Next.js y Tailwind CSS, además de las revisiones de código y la dirección técnica junto a otros equipos.',
      },
      cabanEngineer: {
        role: 'Ingeniero de software',
        story:
          'Entré como ingeniero fullstack, construyendo apps web para los usuarios y para el negocio con React, Next.js, Auth0, Laravel y Django.',
      },
      freelance: {
        role: 'Freelance',
        story:
          'Donde empezó todo: apps enfocadas en React, construidas con distintos equipos.',
      },
      uca: {
        role: 'Ingeniería Mecánica',
        story: 'Estudié en la Universidad Centroamericana José Simeón Cañas.',
      },
    },
    toolGroups: {
      stack: 'Mi stack actual',
      infrastructure: 'Infraestructura',
      ai: 'IA y herramientas',
    },
  },
  projects: {
    title: 'Proyectos',
    lead: 'Productos, herramientas y librerías que he construido o estoy construyendo.',
    all: 'TODOS LOS PROYECTOS',
    crumb: 'proyectos',
    started: 'Desde {month}',
    about: 'ACERCA DE',
    parts: 'PARTES',
    stack: 'STACK',
  },
  skills: {
    title: 'Skills',
    lead: 'Las reglas que les doy a los agentes de código, desde cómo escribir código hasta cómo revisarlo.',
    intro:
      'Funcionan con Claude Code, Codex, Cursor y cualquier agente compatible con el formato Agent Skills.',
    crumb: 'skills',
    installation: 'INSTALACIÓN',
    list: 'SKILLS',
    empty: 'Todavía no hay skills.',
    countOne: '{count} skill',
    countOther: '{count} skills',
    source: 'Código fuente',
    copy: 'Copiar comando',
    copied: 'Copiado',
    copyFailed: 'No se pudo copiar',
  },
  notFound: {
    title: 'No encontrado',
    lead: 'Aquí no hay nada, deja de husmear.',
    home: 'Inicio',
  },
} as const;
