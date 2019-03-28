<template>
    <div class="s-datepicker" @touchmove.prevent>
        <div class="s-input-content">
            <section class="s-input-title" v-if="title">{{title}}</section>
            <input type="text" readonly :placeholder="`请选择${title}`" :value="value" @touchend="dateShowFn" />
        </div>
        <div class="s-picker" v-if="dateShow">
            <section class="s-p-mask" @touchend="dateShowFn"></section>
            <section class="s-p-content" :style="{bottom: `${bottom}px`}">
                <article class="s-p-handle">
                    <span class="s-p-cancel" @touchend="dateShowFn">取消</span>
                    <span class="s-p-confirm" @touchend="confirmFn">确定</span>
                </article>
                <article class="s-picker-box">
                    <!--年 -s-->
                    <ul class="s-p-year"
                        :style="{
                        transition: `transform ${seconds}ms`,
                        transform: `translateY(${yearsTranslate}px)`
                        }"
                        @touchstart="touchStart('Y')"
                        @touchmove="touchMove('Y')"
                        @touchend="touchEnd('Y')"
                    >
                        <li
                                v-for="(yearItem, index) in years"
                                :key="`y-${index}`"
                                :style="{
                                    opacity: yearNow===yearItem?1:((yearNow-1)===yearItem || (yearNow+1)===yearItem)?.4:.1,
                                    transform: `scale(${yearNow===yearItem?1.1:1})`
                                }"
                        >{{yearItem}}</li>
                    </ul>
                    <!--年 -e-->
                    <!--月 -s-->
                    <ul class="s-p-month"
                        :style="{
                        transition: `transform ${seconds}ms`,
                        transform: `translateY(${monthsTranslate}px)`
                        }"
                        @touchstart="touchStart('M')"
                        @touchmove="touchMove('M')"
                        @touchend="touchEnd('M')"
                    >
                        <li
                                v-for="(monthItem, index) in months"
                                :key="`m-${index}`"
                                :style="{
                                    opacity: monthNow===monthItem?1:((monthNow-1)===monthItem || (monthNow+1)===monthItem)?.4:.1,
                                    transform: `scale(${monthNow===monthItem?1.1:1})`
                                }"
                        >{{monthItem}}</li>
                    </ul>
                    <!--月 -e-->
                    <!--日 -s-->
                    <ul class="s-p-day"
                        :style="{
                        transition: `transform ${seconds}ms`,
                        transform: `translateY(${daysTranslate}px)`
                        }"
                        @touchstart="touchStart('D')"
                        @touchmove="touchMove('D')"
                        @touchend="touchEnd('D')"
                    >
                        <li
                                v-for="(dayItem, index) in days"
                                :key="`d-${index}`"
                                :style="{
                                    opacity: dayNow===dayItem?1:((dayNow-1)===dayItem || (dayNow+1)===dayItem)?.4:.1,
                                    transform: `scale(${dayNow===dayItem?1.1:1})`
                                }"
                        >{{dayItem}}</li>
                    </ul>
                    <!--日 -e-->
                </article>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Datepicker",
        props: {
            title: {
                type: String,
                default: ''
            },
            value: { // 当前时间
                type: String,
                default: ''
            },
            range: { // 年范围
                type: String,
                default: '2000-2099'
            },
        },
        data() {
            return {
                bottom: -291,
                dateShow: false, // 日期选择弹窗
                years: [], // 年
                months: [null, null, null, 1,2,3,4,5,6,7,8,9,10,11,12, null, null, null], // 月
                days: [], // 日
                yearNow: null, // 当前年
                monthNow: null, // 当前月
                dayNow: null, // 当前日
                yearsTranslate: 0, // 年-偏移
                yearsTranslateActive: 0, // 年-当前偏移量
                monthsTranslate: 0, // 月-偏移
                monthsTranslateActive: 0, // 月-当前偏移量
                daysTranslate: 0, // 日-偏移
                daysTranslateActive: 0, // 日-当前偏移量
                seconds: 200 // 过度时间
            }
        },
        created() {
            this.dateNowFn(this.value);
        },
        watch: {
            yearNow(now, old) {
                if (now !== old) this.daysFn(this.monthNow);
            },
            monthNow(now, old) {
                if (now !== old) this.daysFn(now);
            },
            days(now, old) {
                if (now !== old) {
                    this.daysFn(now);
                    setTimeout(() => {
                        this.daysChanged()
                    }, 0)
                }
            }
        },
        methods: {
            dateShowFn() {
                // 显示、关闭时间选择器
                this.dateShow=!this.dateShow;
                setTimeout(() => {
                    if (this.dateShow) this.bottom=0;
                    else this.bottom=-291;
                }, 0)
            },
            leapYear(year) {
                // true - 闰年， false - 平年
                return (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));
            },
            dateNowFn(v) {
                // 获取当前年月日
                if (v) {
                    if (v.includes('-') && v.split('-').length===3) {
                        const arr=v.split('-');
                        this.yearNow=+arr[0];
                        this.monthNow=+arr[1];
                        this.dayNow=+arr[2];
                    } else {
                        console.error('Wrong date format, such as `2018-09-03`');
                    }
                } else {
                    const date=new Date();
                    this.yearNow=date.getFullYear();
                    this.monthNow=date.getMonth()+1;
                    this.dayNow=date.getDate();
                }
                this.yearsFn();
                // this.daysFn(this.monthNow);
            },
            yearsFn() {
                const range=this.range.split('-')
                    ,count=range[1]-range[0];
                let years=[];
                if (count<=0) {
                    console.error('Range format is not correct, such as `2000-2099`');
                    return;
                }
                for (let y=0; y<=count; y++) {
                    years.push(+range[0]+y)
                }
                this.years=[null, null, null, ...years, null, null, null];
            },
            daysFn(month) {
                // 计算天
                switch(month) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        this.dayCodeFn(31);
                        break;
                    case 2:
                        this.leapYear(this.yearNow) ? this.dayCodeFn(29) : this.dayCodeFn(28);
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        this.dayCodeFn(30);
                        break;
                }
                this.translateFn(this.yearNow, this.monthNow, this.dayNow);
            },
            daysChanged() {
                // 日数组改变之后，计算当前显示日
                const days=this.days
                    ,dLen=days.length
                    ,dayNow=this.dayNow;

                if (dLen-6<dayNow) {
                    let day=days[dLen-4];
                    this.dayNow=day;
                    try {
                        this.days.map((d, i) => {
                            if (d===day) {
                                throw new Error(-((i-3)*34));
                            }
                        });
                    } catch (e) {
                        const num=+e.message;
                        this.daysTranslate=num;
                        this.daysTranslateActive=num;
                    }
                }
            },
            dayCodeFn(num) {
                // 遍历一个月的数字
                let arr=[];
                for (let i=1; i<=num; i++) {
                    arr.push(i);
                }
                this.days=[null, null, null, ...arr, null, null, null];
            },
            translateFn(Y, M, D) {
                // 计算初始化日期位置
                // 利用try-catch结束循环
                try {
                    this.years.map((d, i) => {
                        if (d===Y) {
                            throw new Error(-((i-3)*34));
                        }
                    });
                } catch (e) {
                    const num=+e.message;
                    this.yearsTranslate=num;
                    this.yearsTranslateActive=num;
                }
                try {
                    this.months.map((d, i) => {
                        if (d===M) {
                            throw new Error(-((i-3)*34));
                        }
                    });
                } catch (e) {
                    const num=+e.message;
                    this.monthsTranslate=num;
                    this.monthsTranslateActive=num;
                }
                try {
                    this.days.map((d, i) => {
                        if (d===D) {
                            throw new Error(-((i-3)*34));
                        }
                    });
                } catch (e) {
                    const num=+e.message;
                    this.daysTranslate=num;
                    this.daysTranslateActive=num;
                }
            },
            touchStart(flag) {
                const start=event.changedTouches[0].pageY;
                this.seconds=0;
                switch (flag) {
                    case 'Y':
                        this.yearStartY=start;
                        break;
                    case 'M':
                        this.monthStartY=start;
                        break;
                    case 'D':
                        this.dayStartY=start;
                        break;
                }
            },
            touchMove(flag) {
                const move=event.changedTouches[0].pageY;
                switch (flag) {
                    case 'Y':
                        const yearMove=move-this.yearStartY;
                        this.yearMoveY=yearMove;
                        this.yearsTranslate=this.yearsTranslateActive+yearMove;
                        break;
                    case 'M':
                        const monthMove=move-this.monthStartY;
                        this.monthMoveY=monthMove;
                        this.monthsTranslate=this.monthsTranslateActive+monthMove;
                        break;
                    case 'D':
                        const dayMove=move-this.dayStartY;
                        this.dayMoveY=dayMove;
                        this.daysTranslate=this.daysTranslateActive+dayMove;
                        break;
                }
            },
            touchEnd(flag) {
                // const end=event.changedTouches[0].pageY;
                this.seconds=200;
                setTimeout(() => {
                    switch (flag) {
                        case 'Y':
                            const years=this.years
                                ,yLen=years.length
                                ,yY=-(yLen-7)*34;
                            if (this.yearsTranslate>=0) {
                                // 设置最小值
                                this.yearsTranslate=0;
                                this.yearsTranslateActive=0;
                                this.yearNow=years[3];
                                return;
                            }
                            if (this.yearsTranslate<=yY) {
                                // 设置最大值
                                this.yearsTranslate=yY;
                                this.yearsTranslateActive=yY;
                                this.yearNow=years[yLen-4];
                                return;
                            }
                            this.yearNow+=-Math.round(this.yearMoveY / 34);
                            const ytl=Math.round(this.yearsTranslate/34)*34;
                            this.yearsTranslate=ytl;
                            this.yearsTranslateActive=ytl;
                            break;
                        case 'M':
                            if (this.monthsTranslate>=0) {
                                this.monthsTranslate=0;
                                this.monthsTranslateActive=0;
                                this.monthNow=1;
                                return;
                            }
                            if (this.monthsTranslate<=-374) {
                                this.monthsTranslate=-374;
                                this.monthsTranslateActive=-374;
                                this.monthNow=12;
                                return;
                            }
                            this.monthNow+=-Math.round(this.monthMoveY / 34);
                            const mtl=Math.round(this.monthsTranslate/34)*34;
                            this.monthsTranslate=mtl;
                            this.monthsTranslateActive=mtl;
                            break;
                        case 'D':
                            const dLen=this.days.length
                                ,dY=-(dLen-7)*34;
                            if (this.daysTranslate>=0) {
                                this.daysTranslate=0;
                                this.daysTranslateActive=0;
                                this.dayNow=1;
                                return;
                            }
                            if (this.daysTranslate<=dY) {
                                this.daysTranslate=dY;
                                this.daysTranslateActive=dY;
                                this.dayNow=dLen-6;
                                return;
                            }
                            this.dayNow+=-Math.round(this.dayMoveY / 34);
                            const dtl=Math.round(this.daysTranslate/34)*34;
                            this.daysTranslate=dtl;
                            this.daysTranslateActive=dtl;
                            break;
                    }
                }, 0)
            },
            confirmFn() {
                // 确定
                this.$emit('input', `${this.yearNow}-${this.monthNow>9?this.monthNow:'0'+this.monthNow}-${this.dayNow>9?this.dayNow:'0'+this.dayNow}`);
                this.dateShowFn();
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-datepicker
  width 100%
.s-input-content
  display inline-flex
  justify-content space-between
  align-items center
  padding 8px 12px
  background-color $default
  width 100%
  .s-input-title
    width 50%
    color $text_title
    font-size 16px
  input
    border 0
    background none
    outline none
    appearance none
    font-size 16px
    color $text_title
    width @width
    height 34px
.s-picker
  width 100%
  .s-p-mask
    position fixed
    left 0
    top 0
    z-index 1000
    background-color rgba(0,0,0,.1)
    width @width
    height @width
.s-p-content
  position fixed
  left 0
  z-index 1001
  background-color $default
  width 100%
  height 291px
  transition bottom 400ms
  .s-p-handle
    display inline-flex
    justify-content space-between
    align-items center
    padding 16px
    background-color $bg_color
    width @width
    span
        font-size 16px
    .s-p-cancel
      color $text_title
    .s-p-confirm
      color $normal
.s-picker-box
  display flex
  justify-content space-around
  align-items flex-start
  width 100%
  max-height 238px
  overflow hidden
  ul
    flex 1
    text-align center
    height auto
    li
      padding 8px 0
      font-size 16px
      color $text_content
      height 34px

</style>
