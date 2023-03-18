export default async function handler(req: any, res: any) {
  try {
    await res.revalidate('/');
    await res.revalidate('/connexion');
    await res.revalidate('/inscription');
    await res.revalidate('/la-carte');
    await res.revalidate('/les-menus');
    await res.revalidate('/mon-compte');
    await res.revalidate('/reserver');
    await res.revalidate('/404');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating all pages');
  }
}
