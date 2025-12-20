/**
 * OpenBento Design System - Z-Index Tokens
 * 
 * 层级系统用于管理元素的堆叠顺序
 * 采用分层策略，预留足够的间隔空间
 */

// ============ 基础层级 ============

export const zIndex = {
    /** 隐藏/置底 */
    hide: -1,

    /** 基础层 - 默认内容 */
    base: 0,

    /** 悬浮层 - 略高于基础 */
    raised: 1,

    /** 下拉菜单层 */
    dropdown: 100,

    /** 粘性元素层 (sticky header) */
    sticky: 200,

    /** 固定元素层 (fixed elements) */
    fixed: 300,

    /** 模态框遮罩层 */
    modalBackdrop: 400,

    /** 模态框内容层 */
    modal: 500,

    /** 弹出层 (Popover, DatePicker) */
    popover: 600,

    /** 工具提示层 */
    tooltip: 700,

    /** 通知/Toast 层 */
    toast: 800,

    /** 加载遮罩层 */
    loading: 900,

    /** 最顶层 - 用于拖拽预览等 */
    max: 9999,
} as const

// ============ 语义化层级 ============

export const semanticZIndex = {
    // 导航相关
    navigation: {
        header: zIndex.sticky,
        sidebar: zIndex.sticky,
        mobileMenu: zIndex.modal,
    },

    // 编辑器相关
    editor: {
        canvas: zIndex.base,
        selectedWidget: zIndex.raised,
        dragOverlay: zIndex.max,
        toolbar: zIndex.sticky,
        panel: zIndex.dropdown,
    },

    // 弹层相关
    overlay: {
        backdrop: zIndex.modalBackdrop,
        modal: zIndex.modal,
        drawer: zIndex.modal,
        popover: zIndex.popover,
        dropdown: zIndex.dropdown,
        tooltip: zIndex.tooltip,
    },

    // 反馈相关
    feedback: {
        toast: zIndex.toast,
        notification: zIndex.toast,
        loading: zIndex.loading,
    },
} as const

// ============ 类型导出 ============

export type ZIndex = keyof typeof zIndex
