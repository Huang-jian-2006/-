<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="not-found">
        <div class="content">
            <h1 class="code">404</h1>
            <p class="title">页面走丢了</p>
            <p class="desc">你访问的页面不存在或已被移除。</p>
            <div class="actions">
                <button class="btn primary" @click="goHome">返回首页</button>
                <button class="btn" @click="goBack">返回上一页</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.not-found {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
    color: #0f172a;
}

.content {
    text-align: center;
    padding: 32px 24px;
    max-width: 480px;
}

.code {
    margin: 0;
    font-size: 96px;
    line-height: 1;
    font-weight: 700;
    color: red;
}

.title {
    margin: 16px 0 8px;
    font-size: 24px;
    font-weight: 600;
}

.desc {
    margin: 0;
    color: #64748b;
    font-size: 14px;
}

.actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    border: 1px solid #cbd5e1;
    background: #fff;
    color: #334155;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover {
    border-color: #94a3b8;
    transform: translateY(-1px);
}

.btn.primary {
    border-color: #2563eb;
    background: #2563eb;
    color: #fff;
}

.btn.primary:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
}
</style>
