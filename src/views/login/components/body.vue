<script setup>
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { CloseBold, UserFilled, Lock } from "@element-plus/icons-vue";
import { loginAPI } from "@/api/login";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { mergeCart } from "@/api/cart";
const counterStore = useCounterStore();
const formRef = ref();

const router = useRouter();
const nameTrigger = ref("blur");
const passwordTrigger = ref("blur");
const form = reactive({
  name: "heima282",
  password: "hm#qd@23!",
  agree: false,
});
const agreeadjust = (_rules, value, callback) => {
  if (value) {
    callback();
    return;
  } else {
    callback(new Error("请勾选隐私条款和服务条款"));
  }
};
const rules = computed(() => ({
  name: [
    { required: true, message: "请输入账号", trigger: nameTrigger.value },
    { min: 6, max: 12, message: "账号是6到12", trigger: nameTrigger.value },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: passwordTrigger.value },
    {
      min: 6,
      max: 12,
      message: "密码是6到12位",
      trigger: passwordTrigger.value,
    },
  ],
  agree: [{ validator: agreeadjust, trigger: "change" }],
}));

const enableChangeTriggerOnFail = async (field) => {
  if (!formRef.value) return;

  try {
    await formRef.value.validateField(field);
  } catch {
    if (field === "name") {
      nameTrigger.value = "change";
      return;
    }
    if (field === "password") {
      passwordTrigger.value = "change";
    }
  }
};

const submitForm = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    const item = await loginAPI(form.name, form.password);
    const successmessage = item.data.message;
    ElNotification({
      title: "登入成功",
      message: successmessage,
      type: "success",
    });
    localStorage.setItem("token", item.data.result.token);
    counterStore.changeUseinfo(item.data.result);
    counterStore.changeLogin(true);

    if (counterStore.cartlis.length) {
      await mergeCart(
        counterStore.cartlis.map((cartItem) => {
          return {
            skuId: cartItem.skuId,
            selected: true,
            count: cartItem.count,
          };
        })
      );
      counterStore.clearLocalCart();
    }

    router.push("/");
  } catch (item) {
    const errormessage =
      item?.response?.data?.message || "登入失败，请稍后重试";
    ElNotification({
      title: "登入失败",
      message: errormessage,
      type: "error",
    });
  }
};
</script>
<template>
  <div>
    <div class="backimge">
      <div class="login">
        <div class="title">账号登录</div>
        <div class="from">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            status-icon
            hide-required-asterisk="true"
            :validate-on-rule-change="false"
          >
            <el-form-item label="账号" prop="name">
              <el-input
                v-model="form.name"
                clearable
                :clear-icon="CloseBold"
                :prefix-icon="UserFilled"
                placeholder="请输入账号"
                @blur="enableChangeTriggerOnFail('name')"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                :prefix-icon="Lock"
                show-password
                placeholder="请输入密码"
                @blur="enableChangeTriggerOnFail('password')"
              />
            </el-form-item>
            <el-form-item class="agree-item" prop="agree">
              <div class="agree-box">
                <el-checkbox v-model="form.agree" class="agree-check">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                color="rgb(39, 186, 155)"
                class="loginsbmit"
                @click="submitForm"
              >
                点击登入
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.backimge {
  position: relative;
  width: 100%;
  height: 488px;
  background-image: url("@/assets/images/login-bg.png");
  .login {
    position: absolute;
    top: 54px;
    right: 450px;
    background-color: rgb(255, 255, 255);
    padding: 20px 20px 20px 20px;
    width: 340px;
    height: 267px;
    .title {
      width: 100%;
      text-align: center;
      margin-bottom: 30px;
      font-size: 18px;
    }
  }
}
.loginsbmit {
  margin: 0 auto;
  margin-top: 10px;
  height: 40px;
  width: 100%;
  color: white;
}

.agree-box {
  position: relative;
  width: 100%;
}

.agree-item {
  margin-bottom: 24px;

  :deep(.el-form-item__content) {
    justify-content: flex-start;
  }

  :deep(.el-form-item__error) {
    left: 0;
    padding-top: 4px;
  }

  :deep(.el-checkbox) {
    align-items: center;
    color: rgb(96, 98, 102);
    font-size: 16px;
  }

  :deep(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
    border-radius: 2px;
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: rgb(102, 186, 173);
    border-color: rgb(102, 186, 173);
  }

  :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: rgb(102, 186, 173);
  }

  :deep(.el-checkbox__label) {
    padding-left: 10px;
  }
}
</style>
