## Observaciones

- El icono de ocultar contraseña de react esta bug
- Se hace el ícono de carga a través de una bandera
- En el directorio lib esta la URL global de axios, contentModal usa axios
- Agregar loaders
- Se debe poner credentials: "include" en todas las peticiones donde se quiera mantener la sesión (depués de login) para no perder las cookies de inicio de sesión en el backend
- Para obtener el usuario en las vistas: 
import { useAuth } from "../context/AuthContext";
const { user } = useAuth();
user.name; etc
- Para hacer las páginas responsive con el Sidebar: El <body> tiene esta propiedad en global.css
<main className="pt-16 min-h-screen bg-[#0a0a0a] text-white p-6 space-y-10 font-poppins"></main>

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
