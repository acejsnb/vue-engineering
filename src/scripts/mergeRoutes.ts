import type {RouteRecordRaw} from 'vue-router';
interface Item {
    name: string
    path: string
}
// 合并多个模板路由

const routes: RouteRecordRaw[] = [];
export default async function () {
    const dirs = import.meta.env.MWT_APP_TPL?.split('|');
    if (!dirs?.length) return;
    for await (const dir of dirs) {
        const modules = await import(`../template/${dir}/routes.ts`);
        const data = modules?.default ?? modules;
        const arr = (data as Item[]).map((item) => {
            item.name && (item.name = dir+'-'+item.name);
            item.path && (item.path = '/'+dir+item.path);
            return item;
        }) as RouteRecordRaw[];
        routes.push(...arr);
    }
    return routes as RouteRecordRaw[];
}

export {routes};