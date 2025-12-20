/**
 * OpenBento - Velocity-Aware Collision Detection
 * 
 * 速度感知碰撞检测算法
 * - 慢速拖动: 需要 80% 重叠才触发
 * - 快速拖动: 只需 60% 重叠就触发（预判用户意图）
 */

import type {
    CollisionDetection,
    DroppableContainer,
    UniqueIdentifier,
} from '@dnd-kit/core'
import { rectIntersection } from '@dnd-kit/core'

// ============ Types ============

interface VelocityState {
    lastPosition: { x: number; y: number } | null
    lastTimestamp: number | null
    velocity: { x: number; y: number }
    speed: number // 速度大小 (px/ms)
}

interface VelocityAwareOptions {
    /** 慢速时的重叠阈值 (默认 0.8 = 80%) */
    slowThreshold?: number
    /** 快速时的重叠阈值 (默认 0.5 = 50%) */
    fastThreshold?: number
    /** 被认为是"快速"的速度 (px/ms) */
    fastSpeedThreshold?: number
    /** 被认为是"慢速"的速度 (px/ms) */
    slowSpeedThreshold?: number
}

// ============ Velocity Tracker ============

let velocityState: VelocityState = {
    lastPosition: null,
    lastTimestamp: null,
    velocity: { x: 0, y: 0 },
    speed: 0,
}

/**
 * 更新速度状态
 */
export const updateVelocity = (x: number, y: number): void => {
    const now = performance.now()

    if (velocityState.lastPosition && velocityState.lastTimestamp) {
        const dt = now - velocityState.lastTimestamp
        if (dt > 0) {
            const dx = x - velocityState.lastPosition.x
            const dy = y - velocityState.lastPosition.y

            // 计算瞬时速度 (px/ms)
            const vx = dx / dt
            const vy = dy / dt

            // 使用指数移动平均平滑速度
            const smoothing = 0.3
            velocityState.velocity = {
                x: velocityState.velocity.x * (1 - smoothing) + vx * smoothing,
                y: velocityState.velocity.y * (1 - smoothing) + vy * smoothing,
            }

            // 计算速度大小
            velocityState.speed = Math.sqrt(
                velocityState.velocity.x ** 2 + velocityState.velocity.y ** 2
            )
        }
    }

    velocityState.lastPosition = { x, y }
    velocityState.lastTimestamp = now
}

/**
 * 重置速度状态
 */
export const resetVelocity = (): void => {
    velocityState = {
        lastPosition: null,
        lastTimestamp: null,
        velocity: { x: 0, y: 0 },
        speed: 0,
    }
}

/**
 * 获取当前速度
 */
export const getVelocity = () => velocityState

// ============ Collision Detection ============

/**
 * 计算两个矩形的重叠百分比
 */
const calculateOverlapPercentage = (
    rect1: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number },
    rect2: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number }
): number => {
    const overlapLeft = Math.max(rect1.left, rect2.left)
    const overlapRight = Math.min(rect1.right, rect2.right)
    const overlapTop = Math.max(rect1.top, rect2.top)
    const overlapBottom = Math.min(rect1.bottom, rect2.bottom)

    const overlapWidth = Math.max(0, overlapRight - overlapLeft)
    const overlapHeight = Math.max(0, overlapBottom - overlapTop)
    const overlapArea = overlapWidth * overlapHeight

    // 使用较小的矩形面积作为基准
    const area1 = rect1.width * rect1.height
    const area2 = rect2.width * rect2.height
    const smallerArea = Math.min(area1, area2)

    if (smallerArea === 0) return 0
    return overlapArea / smallerArea
}

/**
 * 根据速度计算动态阈值
 */
const getDynamicThreshold = (options: VelocityAwareOptions): number => {
    const {
        slowThreshold = 0.8,
        fastThreshold = 0.5,
        fastSpeedThreshold = 0.8, // 0.8 px/ms = 快速
        slowSpeedThreshold = 0.2, // 0.2 px/ms = 慢速
    } = options

    const { speed } = velocityState

    // 速度映射到阈值
    if (speed <= slowSpeedThreshold) {
        return slowThreshold // 慢速 = 需要更多重叠
    }

    if (speed >= fastSpeedThreshold) {
        return fastThreshold // 快速 = 更少重叠就触发
    }

    // 中间速度 = 线性插值
    const t = (speed - slowSpeedThreshold) / (fastSpeedThreshold - slowSpeedThreshold)
    return slowThreshold - t * (slowThreshold - fastThreshold)
}

/**
 * 创建速度感知碰撞检测函数
 */
export const createVelocityAwareCollision = (
    options: VelocityAwareOptions = {}
): CollisionDetection => {
    return (args) => {
        const { collisionRect, droppableRects, droppableContainers, active } = args

        if (!collisionRect) {
            return []
        }

        const threshold = getDynamicThreshold(options)

        // 找出所有满足阈值的碰撞
        const collisions: Array<{ id: UniqueIdentifier; data: { droppableContainer: DroppableContainer; value: number } }> = []

        for (const container of droppableContainers) {
            const { id } = container

            // 跳过自己
            if (id === active.id) continue

            const rect = droppableRects.get(id)
            if (!rect) continue

            const overlap = calculateOverlapPercentage(collisionRect, rect)

            // 只有超过动态阈值才算碰撞
            if (overlap >= threshold) {
                collisions.push({
                    id,
                    data: {
                        droppableContainer: container,
                        value: overlap,
                    },
                })
            }
        }

        // 按重叠百分比排序，返回重叠最多的
        return collisions.sort((a, b) => b.data.value - a.data.value)
    }
}

/**
 * 默认的速度感知碰撞检测
 */
export const velocityAwareCollision = createVelocityAwareCollision({
    slowThreshold: 0.75,  // 慢速: 75% 重叠
    fastThreshold: 0.45,  // 快速: 45% 重叠
    fastSpeedThreshold: 1.0,
    slowSpeedThreshold: 0.3,
})

export default velocityAwareCollision
