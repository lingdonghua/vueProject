<template>
  <div class="pagination">
    <button v-if="pageNo>1" @click="setPageNo(pageNo-1)">上一页</button>
    <button v-if="pageNo>3" @click="setPageNo(1)">1</button>
    <button v-if="pageNo>4">···</button>
    <template v-for="page,index in startAndEndNum.end">
      <button
        :key="index"
        v-if="page>=startAndEndNum.start"
        @click="setPageNo(page)"
        :class="{'active':pageNo===page}"
      >{{ page }}</button>
    </template>

    <button v-if="pageNo<totalPage-Math.floor(this.continues / 2)-1">···</button>
    <button
      v-if="pageNo<totalPage-Math.floor(this.continues / 2)"
      @click="setPageNo(totalPage)"
    >{{ totalPage }}</button>
    <button v-if="pageNo<totalPage" @click="setPageNo(pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
      //根据总数和一页显示条数计算出总页数
      totalPage() {
        return Math.ceil(this.total / this.pageSize)
      },
      //计算出连续页面起始数字和结束数字
      startAndEndNum() {
        let start = 0
        let end = 0
        //总页数比连续的分页小
        if (this.continues > this.totalPage) {
          start = 1
          end = this.totalPage
        } else {
          start = this.pageNo - Math.floor(this.continues / 2)
          end = this.pageNo + Math.floor(this.continues / 2)
          //特殊情况处理
          if (start < 1) {
            start = 1
            end = parseInt(this.continues)
          }
          if (end > this.totalPage) {
            start = this.totalPage - this.continues + 1
            end = parseInt(this.totalPage)
          }
        }
          return {start:start,end: end} || {}

      }
    },
    methods: {
      //向父亲发送用户点击的页码
      setPageNo(page) {
        this.$emit('getCurrentPageNo', page)
      }
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>