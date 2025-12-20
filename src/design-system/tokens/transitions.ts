/**
 * OpenBento Design System - Transition & Animation Tokens
 * 
 * 动效系统用于创建流畅自然的交互体验
 */

// ============ 时长 ============

export const duration = {
    /** 0ms - 无动画 */
    0: '0ms',
    /** 75ms - 极快 */
    75: '75ms',
    /** 100ms - 非常快 */
    100: '100ms',
    /** 150ms - 快速 */
    150: '150ms',
    /** 200ms - 较快 */
    200: '200ms',
    /** 250ms - 默认 */
    250: '250ms',
    /** 300ms - 中等 */
    300: '300ms',
    /** 350ms - 较慢 */
    350: '350ms',
    /** 500ms - 慢速 */
    500: '500ms',
    /** 700ms - 很慢 */
    700: '700ms',
    /** 1000ms - 极慢 */
    1000: '1000ms',
} as const

// ============ 缓动函数 ============

export const easing = {
    /** 线性 */
    linear: 'linear',

    /** 标准缓动 - 通用默认 */
    ease: 'ease',

    /** 缓入 - 开始慢，结束快 */
    easeIn: 'ease-in',
    easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',

    /** 缓出 - 开始快，结束慢 (推荐用于进入动画) */
    easeOut: 'ease-out',
    easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',

    /** 缓入缓出 - 两端慢，中间快 */
    easeInOut: 'ease-in-out',
    easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',

    /** 弹性效果 - 带回弹 */
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    springGentle: 'cubic-bezier(0.22, 1.28, 0.54, 1)',
    springBouncy: 'cubic-bezier(0.34, 2, 0.64, 1)',

    /** 反弹效果 */
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    /** 预设效果 */
    anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// ============ 预设过渡 ============

export const transitions = {
    /** 无过渡 */
    none: 'none',

    /** 快速过渡 - 用于微交互 (hover, focus) */
    fast: `all ${duration[150]} ${easing.easeOutCubic}`,

    /** 默认过渡 - 通用场景 */
    base: `all ${duration[250]} ${easing.easeOutCubic}`,

    /** 慢速过渡 - 用于较大变化 */
    slow: `all ${duration[350]} ${easing.easeOutCubic}`,

    /** 弹簧过渡 - 用于交互反馈 */
    spring: `all ${duration[500]} ${easing.spring}`,

    /** 颜色过渡 */
    colors: `color ${duration[150]} ${easing.ease}, background-color ${duration[150]} ${easing.ease}, border-color ${duration[150]} ${easing.ease}`,

    /** 透明度过渡 */
    opacity: `opacity ${duration[200]} ${easing.ease}`,

    /** 阴影过渡 */
    shadow: `box-shadow ${duration[200]} ${easing.easeOutCubic}`,

    /** 变换过渡 */
    transform: `transform ${duration[250]} ${easing.easeOutCubic}`,
} as const

// ============ 语义化过渡 ============

export const semanticTransitions = {
    // 按钮交互
    button: {
        hover: `all ${duration[150]} ${easing.easeOutCubic}`,
        active: `transform ${duration[75]} ${easing.easeOut}`,
    },

    // 卡片交互
    card: {
        hover: `all ${duration[250]} ${easing.easeOutCubic}`,
        lift: `transform ${duration[300]} ${easing.spring}, box-shadow ${duration[300]} ${easing.easeOutCubic}`,
    },

    // Widget 交互
    widget: {
        hover: `all ${duration[300]} ${easing.easeOutCubic}`,
        drag: `transform ${duration[150]} ${easing.easeOut}`,
        drop: `transform ${duration[500]} ${easing.spring}`,
    },

    // 模态框
    modal: {
        enter: `all ${duration[300]} ${easing.easeOutCubic}`,
        exit: `all ${duration[200]} ${easing.easeInCubic}`,
    },

    // 下拉菜单
    dropdown: {
        enter: `all ${duration[200]} ${easing.easeOutCubic}`,
        exit: `all ${duration[150]} ${easing.easeInCubic}`,
    },

    // 页面切换
    page: {
        enter: `all ${duration[500]} ${easing.easeOutCubic}`,
        exit: `all ${duration[300]} ${easing.easeInCubic}`,
    },
} as const

// ============ 关键帧动画 ============

export const keyframes = {
    // 淡入
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },

    // 淡出
    fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },

    // 向上滑入
    slideInUp: {
        from: { opacity: 0, transform: 'translateY(10px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    },

    // 向下滑入
    slideInDown: {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    },

    // 缩放进入
    scaleIn: {
        from: { opacity: 0, transform: 'scale(0.95)' },
        to: { opacity: 1, transform: 'scale(1)' },
    },

    // 缩放离开
    scaleOut: {
        from: { opacity: 1, transform: 'scale(1)' },
        to: { opacity: 0, transform: 'scale(0.95)' },
    },

    // 脉冲
    pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
    },

    // 弹跳
    bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
    },

    // 摇晃
    shake: {
        '0%, 100%': { transform: 'translateX(0)' },
        '25%': { transform: 'translateX(-5px)' },
        '75%': { transform: 'translateX(5px)' },
    },

    // 旋转
    spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
} as const

// ============ 类型导出 ============

export type Duration = keyof typeof duration
export type Easing = keyof typeof easing
export type Transition = keyof typeof transitions
