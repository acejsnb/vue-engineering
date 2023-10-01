import '@/assets/styles/variables.css';
import '@/assets/styles/global.less';

(async () => {
    const TENANT = import.meta.env.MWT_TENANT;
    if (TENANT) {
        const globalVar = (await import(`tenant/${TENANT}/index.ts`)).default;
        // 设置window全局变量
        Object.entries(globalVar).forEach(([key, value]) => {
            window.CONFIG[key] = value;
        });
        await import(`tenant/${TENANT}/main.ts`);
        return;
    }
    await (await import("./entry")).default();
})();
