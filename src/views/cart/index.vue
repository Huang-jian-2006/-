<script setup>
import { getCart, deleteCart } from "@/api/cart";
import { useCounterStore } from "@/stores/counter";
import { computed, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCounterStore();
const message = computed(() => store.cartlis);
const selectedRows = ref([]);
const rowKeyMap = new WeakMap();
let rowKeySeed = 0;
const token = localStorage.getItem("token");

const getRowKey = (row) => {
  if (!rowKeyMap.has(row)) {
    rowKeyMap.set(row, `cart-row-${rowKeySeed++}`);
  }
  return rowKeyMap.get(row);
};

onMounted(async () => {
  if (token) {
    store.setCartList((await getCart()).data.result);
  } else {
    store.setCartList([...store.cartlis]);
  }
});

const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
};

const setItemCount = (item, value) => {
  item.count = Math.max(1, Number(value) || 1);
};

const totalGoodsCount = computed(() =>
  message.value.reduce((sum, item) => sum + (Number(item.count) || 0), 0)
);

const selectedGoodsCount = computed(() =>
  selectedRows.value.reduce((sum, item) => sum + (Number(item.count) || 0), 0)
);

const selectedTotalPrice = computed(() =>
  selectedRows.value
    .reduce(
      (sum, item) =>
        sum + (Number(item.count) || 0) * (Number(item.price) || 0),
      0
    )
    .toFixed(2)
);

const delcart = async (id) => {
  const currentRow = message.value.find((item) => item.skuId === id);
  if (!currentRow) return;

  await ElMessageBox.confirm("确定删除这件商品吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });

  const previousMessage = [...message.value];
  const previousSelectedRows = [...selectedRows.value];

  store.setCartList(message.value.filter((item) => item.skuId !== id));
  selectedRows.value = selectedRows.value.filter((item) => item.skuId !== id);

  if (token) {
    try {
      await deleteCart({
        ids: [id],
      });
      store.setCartList((await getCart()).data.result);
    } catch {
      store.setCartList(previousMessage);
      selectedRows.value = previousSelectedRows;
      ElMessage.error("删除失败，请稍后重试");
    }
    return;
  }

  store.localdelcart(currentRow);
};

const goToCheckout = () => {
  router.push({
    name: "checkout",
    query: {
      selectedRows: JSON.stringify(selectedRows.value),
    },
  });
};
</script>
<template>
  <div class="main">
    <el-table
      :data="message"
      :row-key="getRowKey"
      style="width: 80%; margin: 0 auto"
      size="large"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" />
      <el-table-column label="商品信息" width="570">
        <template #default="{ row: message }">
          <div class="goods-info">
            <img v-img-lazy="message.picture" class="goods-image" />
            <div class="goods-text">
              <div class="goods-title">{{ message.name }}</div>
              <div class="goods-spec">
                {{ message.attrsText }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="150">
        <template #default="{ row: message }"> ￥{{ message.price }} </template>
      </el-table-column>
      <el-table-column label="数量" width="200">
        <template #default="{ row: message }">
          <el-input-number
            :model-value="message.count"
            :min="1"
            @change="setItemCount(message, $event)"
          />
        </template>
      </el-table-column>
      <el-table-column label="小计" width="180">
        <template #default="{ row: message }">
          <span class="subtotal">￥{{ message.count * message.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="125">
        <template #default="{ row: message }">
          <el-button link type="primary" @click="delcart(message.skuId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="cart-footer">
      <div class="cart-summary">
        共 {{ totalGoodsCount }} 件商品，已选择
        {{ selectedGoodsCount }} 件，商品合计：
        <span class="summary-price">￥{{ selectedTotalPrice }}</span>
      </div>
      <el-button type="primary" class="checkout-button" @click="goToCheckout">
        下单结算
      </el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.main {
  background-color: rgb(245, 245, 245);
  padding: 20px;
}
:deep(.el-table__header-wrapper th) {
  height: 72px;
}

:deep(.el-table__header-wrapper th .cell) {
  font-size: 18px;
  font-weight: 600;
}
.goods-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.goods-image {
  width: 88px;
  height: 88px;
  object-fit: cover;
  flex-shrink: 0;
}

.goods-text {
  min-width: 0;
}

.goods-title {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

.goods-spec {
  margin-top: 10px;
  color: #999;
  font-size: 14px;
}

.subtotal {
  color: #f56c6c;
  font-size: 18px;
}

.cart-footer {
  width: 80%;
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.cart-summary {
  margin: 32px 0 32px 24px;
  color: #666;
  font-size: 16px;
}

.summary-price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 600;
}

.checkout-button {
  margin-right: 24px;
  min-width: 120px;
  height: 42px;
  font-size: 16px;
}
</style>
