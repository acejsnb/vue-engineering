import type {Component} from 'vue';
import type {RouteRecordRaw, RouteMeta} from 'vue-router';

export interface Pages {
    [key: string]: RouteMeta
}
export interface PageComps {
    [key: string]: () => Component
}

// eslint-disable-next-line no-unused-vars
type GenerateRoutes = (pages: Pages, pageComps: PageComps) => RouteRecordRaw[]

// 格式化模板路由
const generateRoutes: GenerateRoutes = (pages: Pages, pageComps) => {
    const comps = Object.values(pageComps);
    const routes = Object.entries(pages).map(([pathUrl, meta], index) => {
        const [_, __,pathName = ''] = pathUrl.split('/');
        const path = pathName === 'home' ? '/' : `/${pathName}`;

        return {
            name: (meta as RouteMeta)?.name ?? pathName,
            path,
            component: comps[index],
            meta
        };
    });

    return routes as RouteRecordRaw[];
};

export default generateRoutes;