---

summary: Una mesa de trading tranquila para cuentas de Alpaca. Opera por tu cuenta, o comparte un espacio de trabajo con tu equipo y decide qué puede hacer cada persona.
links: [Sitio web, GitHub]
---

Treid es una app de trading independiente para cuentas de Alpaca. Alpaca guarda el dinero y ejecuta las órdenes, y Treid es desde donde operas. Muestra tu saldo, poder de compra, efectivo, posiciones y órdenes recientes, y los precios en vivo destellan cuando cambian. En el teléfono, una barra de pestañas deja tus posiciones a un toque, y en el escritorio tienes el trading completo.

Cada cuenta empieza con un espacio de trabajo personal. Un espacio compartido te permite operar con un socio, un club o un fondo pequeño. Invitas a otras personas, le das a cada una un rol (propietario, administrador, miembro de paper o lector), y un registro de actividad guarda lo que hizo cada persona.

Usas tus propias claves de Alpaca y puedes agregar todas las conexiones con nombre que necesites, así que las cuentas de paper y las reales quedan una al lado de la otra en la misma pantalla. Las órdenes reales siempre piden confirmación antes de enviarse. Las claves se cifran con AES-256-GCM al guardarse, solo el servidor las usa para hablar con Alpaca y nunca se envían al navegador.

Treid es de código abierto, así que cada línea que toca claves y órdenes es pública, y puedes alojarlo tú mismo en tu propio Postgres. El inicio de sesión está construido con Better Auth.
