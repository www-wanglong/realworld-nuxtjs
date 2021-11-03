import Vue from 'vue'
import dayjs from 'dayjs'

// 时间格式化
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(value).format(format))