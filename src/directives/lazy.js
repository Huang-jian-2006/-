const PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'%3E%3Crect width='40' height='30' fill='%23f5f5f5'/%3E%3C/svg%3E";

let lazyObserver;
//加载图片
const loadImage = (el) => {
    //将data-src属性的值赋值给src属性，同时移除data-src属性
    const src = el.dataset.src;

    if (!src) {
        return;
    }

    el.setAttribute("src", src);
    el.removeAttribute("data-src");
};
//获取IntersectionObserver实例
const getObserver = () => {
    if (lazyObserver || !("IntersectionObserver" in window)) {
        return lazyObserver;
    }

    lazyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                loadImage(entry.target);
                lazyObserver.unobserve(entry.target);
            });
        },
        {
            rootMargin: "100px 0px",
            threshold: 0.01,
        }
    );

    return lazyObserver;
};

const observeImage = (el, src) => {
    if (!src) {
        el.removeAttribute("src");
        el.removeAttribute("data-src");
        return;
    }

    el.setAttribute("data-src", src);
    el.setAttribute("loading", "lazy");
    el.setAttribute("decoding", "async");

    if (!el.getAttribute("src") || el.getAttribute("src") === src) {
        el.setAttribute("src", PLACEHOLDER);
    }

    const observer = getObserver();

    if (!observer) {
        loadImage(el);
        return;
    }

    observer.observe(el);
};

export const lazyDirective = {
    mounted(el, binding) {
        observeImage(el, binding.value);
    },
    updated(el, binding) {
        if (binding.value === binding.oldValue) {
            return;
        }

        const observer = getObserver();

        if (observer) {
            observer.unobserve(el);
        }

        observeImage(el, binding.value);
    },
    unmounted(el) {
        const observer = getObserver();

        if (observer) {
            observer.unobserve(el);
        }
    },
};
