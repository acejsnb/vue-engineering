import '@/assets/styles/variables.css';
import '@/assets/styles/global.less';

(async () => {
    const TENANT = import.meta.env.MWT_TENANT;
    if (TENANT) {
        await import(`tenant/${TENANT}/main.ts`);
        return;
    }
    await (await import('./entry')).default();
})();
