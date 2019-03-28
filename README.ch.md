## 组件使用

1. Button
    ```
        type必传参数，值为default normal warning error disabled，
        其中type=disabled是不会执行点击函数的;
        loading可选参数，true表示显示loading图标
        
        <template>
            <div class="Button">
                <div class="component component-padding">
                    <h1>Button组件</h1>
                    <div class="btn">
                        <Button :type="type" @touchend="defaultClick">{{type}}</Button>
                        <Button type="normal" @touchend="normalClick">normal</Button>
                        <Button type="warning">warning</Button>
                        <Button type="error">error</Button>
                        <Button type="disabled" :loading="false">disabled</Button>
                    </div>
                </div>
            </div>
        </template>
        
        <script>
            export default {
                name: "ButtonView",
                data() {
                    return {
                        type: 'default',
                    }
                },
                methods: {
                    defaultClick() {
                        console.log('default');
                        if (this.type==='default') this.type='disabled';
                        else this.type='default';
                    },
                    normalClick() {
                        console.log('normal')
                    },
                }
            }
        </script>
    ```
2. Alert
    ```
    alertShow必传参数，显示弹窗
    title必传参数，弹窗标题
    content必传参数，弹窗内容提示
    iconLoading可选参数，是否显示loading效果
    close可选参数，关闭弹窗
    confirm可选参数，确定按钮执行的方法
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>Alert组件</h1>
                <div class="alertShow">
                    <Button type="normal" @touchend="alertShowFn">alertShow</Button>
                </div>
                <Alert
                        :alertShow="alertShow"
                        title="弹窗提示"
                        content="确定要删除此列表吗？"
                        :iconLoading="true"
                        @close="alertClose"
                        @confirm="alertConfirm"
                />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "AlertView",
            data() {
                return {
                    alertShow: false,
                }
            },
            methods: {
                alertShowFn() {
                    this.alertShow=true
                },
                alertClose() {
                    this.alertShow=false
                },
                alertConfirm() {
                    console.log('alertConfirm')
                },
            }
        }
    </script>
    ```
3. Message
    ```
    Message有四个方法：
    1.info：this.$message.info('这是一条消息');
    2.success：this.$message.success('Oh,yes');
    3.warning：this.$message.warning('Oh,no');
    4.error：this.$message.error('Oh,error');
    可单独调用，也可通过传入json对象形势调用，需注意，通过json调用需传入type和message两个属性。
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>Message组件</h1>
                <Button type="default" @touchend="messageInfo">info</Button>
                <Button type="normal" @touchend="messageSuccess">success</Button>
                <Button type="warning" @touchend="messageWarning">warning</Button>
                <Button type="error" @touchend="messageError">error</Button>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "MessageView",
            methods: {
                messageInfo() {
                    this.$message.info('这是一条消息');
                },
                messageSuccess() {
                    this.$message.success('Oh,yes');
                },
                messageWarning() {
                    this.$message.warning('Oh,no');
                },
                messageError() {
                    this.$message({
                        type: 'error',
                        message: '错了哦，这是一条错误消息'
                    });
                },
            }
        }
    </script>
    ```
4. List
    ```
    List组件的data参数类型是Array，格式：[{title: 'xxx'}, more: 'more', url: 'url'],
    其中title是列表显示的名字，必传蚕食、
    more是小标题，可选参数、
    url是要跳转到的路由、可选参数。
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>List组件</h1>
                <List :data="listData" />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "ListView",
            data() {
                return {
                    listData: [
                        {title: '已支付'},
                        {title: '未支付', more: '更多', url: 'url1'},
                        {title: '售后', more: '查看', url: 'url2'},
                    ],
                }
            }
        }
    </script>
    ```
5. Carousel
    ```
    轮播组件，data参数类是是Array，格式：[{img: imgUrl, {img: imgUrl, url: 'url'}}],
    img是轮播图片地址、url要跳转到的路由，次参数可选.
    
    <template>
        <div class="Button">
            <div class="component">
                <h1>Carousel组件</h1>
                <Carousel :data="dataCarousel"></Carousel>
            </div>
        </div>
    </template>
    
    <script>
        import duizhang from 'images/duizhang.jpg';
        import leishen from 'images/leishen.jpg';
        import zuhe from 'images/zuhe.jpg';
    
        export default {
            name: "CarouselView",
            data() {
                return {
                    dataCarousel: [
                        {img: duizhang},
                        {img: leishen, url: 'https://baidu.com'},
                        {img: zuhe, url: 'https://jd.com'}
                    ]
                }
            },
        }
    </script>
    ```
6. Select
    ```
    data--数组，[
              {text: '宋江', id: 1},
              {text: '鲁智深', id: 2},
              {text: '吴勇', id: 3}
            ]；
        @touchend="selectedFn"--回调，返回选择的值
    
    <template>
        <div class="Select">
            <div class="component component-padding">
                <h1>Select组件</h1>
                <Select
                        :data="dataSelect"
                        @touchend="selectedFn"
                >{{selectedVal}}</Select>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "SelectView",
            data() {
                return {
                    dataSelect: [
                        {text: '宋江', id: 1},
                        {text: '鲁智深', id: 2},
                        {text: '吴勇', id: 3},
                        {text: '孙二娘', id: 4},
                        {text: '卢俊义', id: 5},
                        {text: '公孙胜', id: 6},
                        {text: '林冲', id: 7},
                        {text: '呼延灼', id: 8},
                        {text: '花荣', id: 9},
                        {text: '柴进', id: 10},
                        {text: '李应', id: 11},
                        {text: '朱仝', id: 12},
                        {text: '董平', id: 13},
                        {text: '关胜', id: 14},
                        {text: '时迁', id: 15},
                    ],
                    selectedVal: '请选择人物',
                }
            },
            methods: {
                selectedFn(d) {
                    console.log('selected', d);
                    this.selectedVal=d.text;
                },
            }
        }
    </script>
    ```
7. Input
    ```
    参数说明：
    title：input输入框的名字，
    required：值为true会显示*号，
    type：输入框的类型，
    placeholder：占位文字，
    maxlength：最大长度
    v-model：双向绑定的值
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>Input组件</h1>
                <Input
                        title="用户名"
                        required="true"
                        type="text"
                        placeholder="请输入用户名"
                        maxlength="10"
                        v-model="inputUsername"
                />
                <Input
                        title="密码"
                        required="true"
                        type="password"
                        placeholder="请输入密码"
                        maxlength="8"
                        v-model="inputPassword"
                />
                <Input
                        type="text"
                        placeholder="请输入"
                />
                <Button type="normal" @touchend="inputValueFn">inputValue</Button>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "InputView",
            data() {
                return {
                    inputUsername: '',
                    inputPassword: '',
                }
            },
            methods: {
                inputValueFn() {
                    console.log('username', this.inputUsername);
                    console.log('password', this.inputPassword);
                }
            }
        }
    </script>
    ```
8. Datepicker
    ```
    参数说明：
    title:日期选择器的名字
    v-model:双向绑定的数据
    range:值范围
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>Datepicker组件</h1>
                <Datepicker
                        title="生日"
                        v-model="date"
                        range="2000-2099"
                />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "DatepickerView",
            data() {
                return {
                    date: '2019-10-01',
                }
            }
        }
    </script>
    ```
9. Toggle
    ```
    v-model:双向绑定的值
    
    <template>
        <div class="toggleView">
            <div class="component component-padding">
                <h1>Toggle组件</h1>
                <Toggle v-model="toggleVal" />
                <Toggle v-model="toggleVal2" />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "ToggleView",
            data() {
                return {
                    toggleVal: true,
                    toggleVal2: false
                }
            },
            watch: {
                toggleVal(now, old) {
                    if (now !== old) console.log(now);
                }
            }
        }
    </script>
    ```








