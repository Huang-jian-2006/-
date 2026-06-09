<script setup>
import { onMounted, ref, watch } from "vue";
import ImgChange from "./goodsDetail/imgChange.vue";
import { useCounterStore } from "@/stores/counter";
import { addCartApi } from "@/api/cart";
const counterStore = useCounterStore();
import {
  Star,
  Handbag,
  ChatLineSquare,
  ElementPlus,
} from "@element-plus/icons-vue";
import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  valueEquals,
} from "element-plus";
const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
const num = ref(1);
const maxnum = ref(300);
const activeSkuId = ref(null);
const addCart = () => {
  console.log(props.message.skus);
  if (num.value > maxnum.value) {
    ElNotification({
      type: "warning",
      message: `数量不能超过库存${maxnum.value}`,
    });
    return;
  }
  if (activeSkuId.value) {
    ElMessageBox.confirm("确认加入购物车吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        console.log(1);
        props.message.skus.forEach((item) => {
          if (item.id === activeSkuId.value) {
            console.log(item);
            addCartApi({ skuId: item.id, count: num.value });
            counterStore.localaddcart({
              attrsText: item.specs[0].name + ":" + item.specs[0].valueName,
              count: num.value,
              id: item.id,
              goodsId: props.message.id,
              name: props.message.name,
              picture: item.picture,
              price: item.price,
              skuId: item.id,
              skuCode: item.skuCode,
            });
          }
        });
        ElNotification({
          type: "success",
          message: "加入购物车成功",
        });
      })
      .catch(() => {
        console.log(2);
        ElNotification({
          type: "info",
          message: "已取消加入购物车",
        });
      });
  } else {
    ElNotification({
      type: "warning",
      message: "请选择商品规格",
    });
  }
};
watch(
  () => props.message.skus,
  () => {
    activeSkuId.value = null;
  }
);

const selectSku = (id, inventory) => {
  if (inventory <= 0) {
    ElNotification({
      type: "warning",
      message: "库存不足",
    });
    activeSkuId.value = null;
    return;
  }
  maxnum.value = inventory;
  activeSkuId.value = id;
};
</script>
<template>
  <div class="goods-detail" v-loading="props.loading">
    <div class="left">
      <ImgChange :image-list="props.message.mainPictures || []" />
      <div class="goods-text" v-if="!props.loading && props.message.brand">
        <div class="smalltext">
          <div class="title">销售人气</div>
          <div class="content">{{ props.message.salesCount }}+</div>
          <div class="link">
            <el-icon><Handbag /></el-icon>
            销量人气
          </div>
        </div>
        <div class="smalltext">
          <div class="title">商品评价</div>
          <div class="content">{{ props.message.commentCount }}+</div>
          <div class="link">
            <el-icon><ChatLineSquare /></el-icon>
            查看评论
          </div>
        </div>
        <div class="smalltext">
          <div class="title">收藏人气</div>
          <div class="content">{{ props.message.collectCount }}+</div>
          <div class="link">
            <el-icon><Star /></el-icon>
            收藏商品
          </div>
        </div>
        <div class="smalltext" v-if="props.message.brand.name">
          <div class="title">品牌信息</div>
          <div class="content">{{ props.message.brand.name }}</div>
          <div class="link">
            <el-icon><ElementPlus /></el-icon>
            品牌主页
          </div>
        </div>
      </div>
    </div>
    <div class="right" v-if="!props.loading">
      <div class="title">{{ props.message.name }}</div>
      <div class="desc">{{ props.message.desc }}</div>
      <div class="price">
        <span class="new">¥{{ props.message.price }}</span>
        <span class="old">¥{{ props.message.oldPrice }}</span>
      </div>
      <div class="discount">
        <dl>
          <dt>促销</dt>
          <dd>12月好物放送,App领券购买直降120元</dd>
        </dl>
        <dl>
          <dt>服务</dt>
          <dd>
            <span>无忧退货</span>
            <span>快速退款</span>
            <span>免费包邮</span>
            <a href="javascript:;">了解详情</a>
          </dd>
        </dl>
      </div>
      <div class="pattern">
        <div class="p-left">规格</div>
        <div class="p-right">
          <img
            v-img-lazy="item.picture"
            v-for="item in props.message.skus"
            :key="item.id"
            :class="{
              no_count: item.inventory === 0,
              active_sku:
                activeSkuId === item.id && item.inventory > 0 ? true : false,
            }"
            @click="selectSku(item.id, item.inventory)"
          />
        </div>
      </div>
      <div class="count">
        <el-input-number v-model="num" :min="0" :max="maxnum" />
      </div>
      <div class="add">
        <el-button size="large" @click="addCart">加入购物车</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.goods-detail {
  width: 1240px;
  height: 600px;
  margin: 0 auto;
  display: flex;

  .left {
    width: 480px;
    height: 540px;
    padding: 30px 50px 30px 50px;
    .goods-text {
      width: 400px;
      height: 140px;
      display: flex;
      align-items: center;
      text-align: center;
      .smalltext {
        width: 100px;
        position: relative;
        .title {
          cursor: default;
          width: 100%;
          text-align: center;
          color: rgb(153, 153, 153);
          font-size: 14px;
          margin-bottom: 10px;
        }
        .content {
          cursor: default;
          color: rgb(207, 68, 68);
          font-size: 14px;
          text-align: center;
          margin-bottom: 10px;
        }
        .link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          width: 100%;
          text-align: center;
          color: rgb(102, 102, 102);
          font-size: 14px;
        }
        .link:hover {
          color: rgb(39, 186, 155);
        }
      }
      .smalltext:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 72px;
        background-color: rgb(229, 229, 229);
      }
    }
  }
  .right {
    width: 760px;
    height: 540px;
    padding: 30px 50px 30px 50px;
    .title {
      color: rgb(51, 51, 51);
      font-size: 22px;
    }
    .desc {
      color: rgb(153, 153, 153);
      font-size: 14px;
      margin-top: 10px;
    }
    .price {
      margin-top: 10px;
      .new {
        color: rgb(207, 68, 68);
        font-size: 22px;
        margin-right: 10px;
      }
      .old {
        color: rgb(153, 153, 153);
        font-size: 16px;
        text-decoration: line-through;
      }
    }
    .discount {
      width: 480px;
      height: 80px;
      margin-top: 10px;
      padding: 20px 10px 0 10px;
      background-color: rgb(245, 245, 245);
      dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;

        dt {
          width: 50px;
          color: #999;
        }

        dd {
          color: #666;

          &:last-child {
            span {
              margin-right: 10px;

              &::before {
                content: "•";
                color: rgb(39, 187, 154);
                margin-right: 2px;
              }
            }

            a {
              color: rgb(39, 187, 154);
              text-decoration: none;
            }
          }
        }
      }
    }
    .pattern {
      width: 620px;
      display: flex;
      padding: 20px 0 20px 10px;
      .p-left {
        display: flex;
        align-items: center;
        width: 50px;
        font-size: 14px;
        color: rgb(153, 153, 153);
      }
      .p-right {
        padding: 0 20px 0 0;
        width: 570px;
        img {
          cursor: pointer;
          width: 50px;
          height: 50px;
          margin: 0 10px 4px 0;
          border: 1px solid #ccc;
        }
        .active_sku {
          border-color: rgb(39, 186, 155);
        }
        .no_count {
          cursor: not-allowed;
        }
      }
    }
    .count {
      margin-top: 10px;
    }
    .add {
      margin-top: 20px;
    }
  }
}
</style>
