export default async function () {
    const tpls = import.meta.env.VITE_APP_TPL?.split('|')
    if (!tpls?.length) return;
    const routes = [];
    for await (let item of tpls) {
        const modules = (await import(`../template/${item}/routes`)).default;
        modules.forEach(d => {
            d.name && (d.name = item+'-'+d.name);
            d.path && (d.path = '/'+item+d.path);
        })
        routes.push(...modules)
    }
    return routes;
}