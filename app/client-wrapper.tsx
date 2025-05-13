'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

//Para el loader global, aún no es funcional

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Guarda referencias originales ANTES de sobrescribir
    const originalPush = router.push.bind(router);
    const originalReplace = router.replace.bind(router);

    const patchRouter = (method: 'push' | 'replace') => {
      return (href: string, options?: Parameters<typeof router.push>[1]) => {
        setLoading(true);
        return method === 'push'
          ? originalPush(href, options)
          : originalReplace(href, options);
      };
    };

    // Sobrescribir temporalmente
    (router.push as any) = patchRouter('push');
    (router.replace as any) = patchRouter('replace');

    const stopLoader = () => setLoading(false);
    window.addEventListener('load', stopLoader);

    return () => {
      (router.push as any) = originalPush;
      (router.replace as any) = originalReplace;
      window.removeEventListener('load', stopLoader);
    };
  }, [router]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}
