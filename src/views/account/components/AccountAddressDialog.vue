<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "修改收货地址",
  },
  addressForm: {
    type: Object,
    required: true,
  },
});

defineEmits(["update:visible", "save"]);
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="620px"
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-form label-width="90px" class="address-form">
      <el-form-item label="收件人">
        <el-input v-model="addressForm.receiver" placeholder="请输入收件人" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addressForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="地址标签">
        <el-input v-model="addressForm.tag" placeholder="如：家、公司" />
      </el-form-item>
      <div class="address-form-row">
        <el-form-item label="省份">
          <el-input v-model="addressForm.province" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="addressForm.city" placeholder="请输入城市" />
        </el-form-item>
      </div>
      <div class="address-form-row">
        <el-form-item label="地区">
          <el-input v-model="addressForm.area" placeholder="请输入区县" />
        </el-form-item>
      </div>
      <el-form-item label="详细地址">
        <el-input
          v-model="addressForm.detail"
          type="textarea"
          :rows="3"
          placeholder="请输入详细门牌地址"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="success" @click="$emit('save')">保存地址</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.address-form {
  padding-right: 18px;
}

.address-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
