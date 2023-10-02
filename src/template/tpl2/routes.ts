import generateRoutes, { Pages, PageComps } from '@/scripts/generateRoutes';

const pages = import.meta.glob('./views/**/page.ts', {eager: true, import: 'default'});
// const pageComps = import.meta.glob('./views/**/*.vue');
const pageComps = import.meta.glob('./views/**/(*.vue|*.tsx)');

export default generateRoutes(pages as Pages, pageComps as PageComps);
