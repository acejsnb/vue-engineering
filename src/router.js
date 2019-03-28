import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ComponentLists from './views/ComponentLists';
import ButtonView from './views/ButtonView';
import AlertView from './views/AlertView';
import MessageView from './views/MessageView';
import ListView from './views/ListView';
import CarouselView from './views/CarouselView';
import SelectView from './views/SelectView';
import InputView from './views/InputView';
import DatepickerView from './views/DatepickerView';
import ToggleView from './views/toggleView';

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({x: 0, y: 0}),
    linkActiveClass: 'activeStyle',
    routes: [
        {
            path: '/componentLists',
            name: 'ComponentLists',
            component: ComponentLists,
            meta: {
                title: 'ComponentLists'
            }
        },
        {
            path: '/buttonView',
            name: 'ButtonView',
            component: ButtonView,
            meta: {
                title: 'ButtonView'
            }
        },
        {
            path: '/alertView',
            name: 'AlertView',
            component: AlertView,
            meta: {
                title: 'AlertView'
            }
        },
        {
            path: '/messageView',
            name: 'MessageView',
            component: MessageView,
            meta: {
                title: 'MessageView'
            }
        },
        {
            path: '/listView',
            name: 'ListView',
            component: ListView,
            meta: {
                title: 'ListView'
            }
        },
        {
            path: '/carouselView',
            name: 'CarouselView',
            component: CarouselView,
            meta: {
                title: 'CarouselView'
            }
        },
        {
            path: '/selectView',
            name: 'SelectView',
            component: SelectView,
            meta: {
                title: 'SelectView'
            }
        },
        {
            path: '/inputView',
            name: 'InputView',
            component: InputView,
            meta: {
                title: 'InputView'
            }
        },
        {
            path: '/datepickerView',
            name: 'DatepickerView',
            component: DatepickerView,
            meta: {
                title: 'DatepickerView'
            }
        },
        {
            path: '/toggleView',
            name: 'ToggleView',
            component: ToggleView,
            meta: {
                title: 'ToggleView'
            }
        },
        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});
