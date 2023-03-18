export default async function handler(req: any, res: any) {
  try {
    await res.revalidate('/les-menus');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating menus page');
  }
}
