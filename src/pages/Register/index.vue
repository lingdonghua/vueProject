<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" @change="schema('phone')" />
        <span class="error-msg" v-show="isPhone || phone===''">请输入正确的手机格式</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="width:100px;height:37px;margin-left: 5px;" @click="schema('code')">验证码</button>
        <span class="error-msg" v-show="isCode">请输入验证码</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password" />
        <span class="error-msg" v-show="password===''">密码不能为空</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
          @change="schema('confirmPassword')"
        />
        <span class="error-msg" v-show="isConfirmPassword">两次密码不一致</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="!isAgree">未勾选同意</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        phone: '',
        code: '',
        password: '',
        password2: '',
        isAgree: true,
        //错误信息提醒
        isPhone: false,
        isCode: false,
        isConfirmPassword: false
      }
    },
    methods: {
      //表单规则验证+获取验证码
      schema(flat) {
        switch (flat) {
          // case 'phone':
          //   //手机号规则验证
          //   var regexp = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
          //   if (!regexp.test(this.phone)) {
          //     this.isPhone=true
          //   } else {
          //     this.isPhone=false
          //   }
          //   break
          case 'code':
            //获取验证码规则验证
            console.log(this.Phone === '');
            this.phone.trim() === '' ? this.isPhone = true : this.isPhone = false
            if (!this.isPhone) {
              //派发请求获取验证码
              this.$store.dispatch('user/getCode', this.phone).then(() => {
                this.code = this.$store.state.user.code
              }).catch((error) => {
                alert(error.message)
              })
            }
            break
          case 'confirmPassword':
            this.code.trim() === '' ? this.isCode = true : this.isCode = false
            this.password === this.password2 ? this.isConfirmPassword = false : this.isConfirmPassword = true
            break
        }
      },
      //完成注册
      register() {
          (this.isAgree && !this.isPhone && !this.isCode && !this.isConfirmPassword && this.password !== '') && this
          .$store.dispatch('user/register', {
            phone: this.phone,
            password: this.password,
            code:this.code
          }).then(() => {
          //注册成功，路由跳转
          this.$router.push('/login')
          }).catch((error) => {
            alert(error.message)
          })

      }
    }
  }
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>