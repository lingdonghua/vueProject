import Mock from 'mockjs'
import banner from './banner.json'
import floors from './floors.json'
//模拟首页的大轮播图的服务器数据
Mock.mock("/mock/banner", { code: 200, data: banner })
//模拟floors组件轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floors})
