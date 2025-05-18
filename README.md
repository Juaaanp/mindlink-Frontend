## Observaciones

- El icono de ocultar contraseña de react esta bug
- Se hace el ícono de carga a través de una bandera
- En el directorio lib esta la URL global de axios, contentModal usa axios
- Agregar loaders <--------
- Las peticiones se hacen con axios
- Para obtener el usuario en las vistas: 
import { useAuth } from "../context/AuthContext";
const { user } = useAuth();
if (!user) return toast...
user.name; etc
- Para hacer las páginas responsive con el Sidebar: El <body> tiene esta propiedad en global.css
<main className="pt-20 min-h-screen bg-[#0a0a0a] text-white p-6 font-poppins"></main>
- Para evitar problemas con el sidebar que empuja el contenido en pages donde no esta, se debe poner un estado parecido a isAdmin en estas vistas, (creo); /, /profile, etc
- Se puede filtrar de la barra de búsqueda con: .filter(g =>
                                g.topic.toLowerCase().includes(searchQuery.toLowerCase())
                            )
- En Study Groups el estudiante puede gestionar los grupos (participar) pero no va a ser mimebro
- Las valoraciones aún no se envían con el id del autenticado
- Valoraciones quitadas de MyContents

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
