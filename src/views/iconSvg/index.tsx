import {defineComponent, ref} from 'vue';
import styles from './style.module.less';

interface Component {
    name: string
    content: string
}

const Index = defineComponent({
    setup() {
        const iconComps = import.meta.glob('@/assets/iconSvg/*.svg', {as: 'raw'});
        const components = ref<Component[]>([]);

        Object.entries(iconComps)?.forEach(async ([path, module]) => {
            const name = path.split('/').filter(Boolean)[3];
            const content = await module();

            components.value.push({name, content});
        });

        return () => (
            <div class={styles.page}>
                {components.value.map(item => (
                    <div class={styles.pageItem}>
                        <section class={styles.pageItemIcon} v-html={item.content}></section>
                        <section>{item.name}</section>
                    </div>
                ))}
            </div>
        );
    }
});

export default Index;
