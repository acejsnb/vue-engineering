import {computed, ref} from 'vue';

import zh from 'i18n/zh';
import en from 'i18n/en';
interface LangItem {
    [key: string]: string | LangItem
}
const langConfig: LangItem = {
    en,
    zh
};
const langObj = {
    en: 'English',
    zh: '简体中文'
};

export function useI18nHook() {
    const currentLang = ref<string>('zh');
    const langList = computed(() => langConfig[currentLang.value]);

    return {
        langConfig,
        langObj,
        currentLang,
        langList
    };
}