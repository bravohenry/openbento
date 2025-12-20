'use client'

/**
 * OpenBento Design System Showcase
 * 
 * Phase 2 组件展示页面 (完整版)
 */

import React, { useState } from 'react'
import {
    Button,
    Avatar,
    Badge,
    Card,
    Input,
    Modal,
    Tooltip,
    Dropdown,
    TwitterIcon,
    InstagramIcon,
    TikTokIcon,
    LinkedInIcon,
    SpotifyIcon,
    WhatsAppIcon,
    LinkIcon,
    MapPinIcon,
    GitHubIcon,
    type DropdownItem,
} from '@/design-system/patterns'
import { VStack, HStack, Text } from '@/design-system/primitives'
import { ThemeProvider } from '@/design-system/foundation/theme'

// 简单的背景图标容器
const IconBox = ({ children, bgColor }: { children: React.ReactNode; bgColor: string }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: bgColor,
            color: '#fff',
            flexShrink: 0,
        }}
    >
        {children}
    </div>
)

// 搜索图标
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
)

// 编辑图标
const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
)

// 复制图标
const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
)

// 删除图标
const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
)

export default function ShowcasePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    // Dropdown 菜单项
    const dropdownItems: DropdownItem[] = [
        { key: 'edit', label: 'Edit', icon: <EditIcon /> },
        { key: 'duplicate', label: 'Duplicate', icon: <CopyIcon /> },
        { key: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true, divider: true },
    ]

    return (
        <ThemeProvider defaultMode="light">
            <div
                style={{
                    minHeight: '100vh',
                    padding: '48px 24px',
                    background: 'var(--color-bg-primary)',
                }}
            >
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <Text variant="display" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)">
                            OpenBento Design System
                        </Text>
                        <Text
                            variant="bodyLarge"
                            color="secondary"
                            style={{ marginTop: 16, maxWidth: 600, margin: '16px auto 0' }}
                        >
                            Phase 2: Complete Pattern Components
                        </Text>
                    </div>

                    {/* Buttons Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Buttons
                        </Text>

                        <VStack gap={6}>
                            {/* Basic Variants */}
                            <div>
                                <Text variant="h4" color="secondary" style={{ marginBottom: 12 }}>
                                    基础变体
                                </Text>
                                <HStack gap={3} wrap>
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="success">Success</Button>
                                </HStack>
                            </div>

                            {/* Social Media Follow Buttons */}
                            <div>
                                <Text variant="h4" color="secondary" style={{ marginBottom: 12 }}>
                                    社交媒体 Follow 按钮 (Bento.me 风格)
                                </Text>
                                <HStack gap={3} wrap>
                                    <Button variant="twitter" size="sm" shape="pill">Follow</Button>
                                    <Button variant="instagram" size="sm" shape="pill">Follow</Button>
                                    <Button variant="tiktok" size="sm" shape="pill" badge={8}>Follow</Button>
                                    <Button variant="linkedin" size="sm" shape="pill">Follow</Button>
                                    <Button variant="youtube" size="sm" shape="pill">Subscribe</Button>
                                    <Button variant="spotify" size="sm" shape="pill">Listen</Button>
                                </HStack>
                            </div>

                            {/* With Icons */}
                            <div>
                                <Text variant="h4" color="secondary" style={{ marginBottom: 12 }}>
                                    带图标
                                </Text>
                                <HStack gap={3}>
                                    <Button variant="spotify" leftIcon={<SpotifyIcon size={18} />}>
                                        Listen on Spotify
                                    </Button>
                                    <Button variant="github" leftIcon={<GitHubIcon size={18} />}>
                                        Star on GitHub
                                    </Button>
                                </HStack>
                            </div>
                        </VStack>
                    </section>

                    {/* Input Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Inputs
                        </Text>

                        <VStack gap={6}>
                            <HStack gap={4} wrap>
                                <Input
                                    label="Email"
                                    placeholder="you@example.com"
                                    helperText="We'll never share your email"
                                    style={{ width: 300 }}
                                />
                                <Input
                                    label="Search"
                                    placeholder="Search..."
                                    leftElement={<SearchIcon />}
                                    style={{ width: 300 }}
                                />
                            </HStack>

                            <HStack gap={4} wrap>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    isError
                                    errorText="Password is required"
                                    style={{ width: 300 }}
                                />
                                <Input
                                    label="Website"
                                    placeholder="example.com"
                                    leftAddon="https://"
                                    style={{ width: 300 }}
                                />
                            </HStack>

                            <HStack gap={4}>
                                <Input variant="filled" placeholder="Filled variant" style={{ width: 200 }} />
                                <Input variant="flushed" placeholder="Flushed variant" style={{ width: 200 }} />
                            </HStack>
                        </VStack>
                    </section>

                    {/* Avatars Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Avatars
                        </Text>

                        <HStack gap={4} wrap align="end">
                            <Avatar size="xs" name="John Doe" />
                            <Avatar size="sm" name="Jane Smith" />
                            <Avatar size="md" name="Bob Wilson" />
                            <Avatar size="lg" name="Alice Brown" />
                            <Avatar size="xl" name="Charlie Davis" />
                            <Avatar size="2xl" name="Eva Green" showStatus status="online" />
                        </HStack>
                    </section>

                    {/* Badges Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Badges
                        </Text>

                        <HStack gap={3} wrap>
                            <Badge>Default</Badge>
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Active</Badge>
                            <Badge variant="warning">Pending</Badge>
                            <Badge variant="danger">Expired</Badge>
                            <Badge variant="info">New</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge rounded variant="primary">8</Badge>
                            <Badge rounded variant="danger">99+</Badge>
                        </HStack>
                    </section>

                    {/* Tooltip & Dropdown Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Tooltip & Dropdown
                        </Text>

                        <HStack gap={6}>
                            <div>
                                <Text variant="h4" color="secondary" style={{ marginBottom: 12 }}>
                                    Tooltip
                                </Text>
                                <HStack gap={3}>
                                    <Tooltip content="This is a tooltip!">
                                        <Button variant="secondary">Hover me</Button>
                                    </Tooltip>
                                    <Tooltip content="Bottom placement" placement="bottom">
                                        <Button variant="outline">Bottom</Button>
                                    </Tooltip>
                                    <Tooltip content="With arrow" hasArrow>
                                        <Button variant="ghost">With Arrow</Button>
                                    </Tooltip>
                                </HStack>
                            </div>

                            <div>
                                <Text variant="h4" color="secondary" style={{ marginBottom: 12 }}>
                                    Dropdown
                                </Text>
                                <Dropdown
                                    trigger={<Button variant="secondary">Options ▾</Button>}
                                    items={dropdownItems}
                                    onSelect={(key) => alert(`Selected: ${key}`)}
                                />
                            </div>
                        </HStack>
                    </section>

                    {/* Modal Section */}
                    <section style={{ marginBottom: 64 }}>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Modal
                        </Text>

                        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </Button>

                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            title="Edit Profile"
                            footer={
                                <>
                                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>Save</Button>
                                </>
                            }
                        >
                            <VStack gap={4}>
                                <Input
                                    label="Name"
                                    placeholder="Your name"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    fullWidth
                                />
                                <Input label="Email" placeholder="you@example.com" fullWidth />
                                <Input label="Bio" placeholder="Tell us about yourself..." fullWidth />
                            </VStack>
                        </Modal>
                    </section>

                    {/* Cards Section - Bento Style */}
                    <section>
                        <Text variant="h2" style={{ marginBottom: 24 }}>
                            Cards (Bento.me 风格)
                        </Text>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: 16,
                                maxWidth: 800,
                            }}
                        >
                            {/* WhatsApp Card */}
                            <Card size="2x1" variant="elevated" rounded="xl" clickable>
                                <Card.Header
                                    icon={<IconBox bgColor="#25d366"><WhatsAppIcon size={24} /></IconBox>}
                                    title="Join Biuty🌸 Community"
                                    subtitle="chat.whatsapp.com"
                                />
                            </Card>

                            {/* LinkedIn Card - 2x2 */}
                            <Card
                                size="2x2"
                                variant="filled"
                                rounded="xl"
                                padding="lg"
                                clickable
                                style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
                            >
                                <Card.Header
                                    icon={<IconBox bgColor="#0a66c2"><LinkedInIcon size={24} /></IconBox>}
                                    title="Follow us on Linkedin"
                                    subtitle="linkedin.com"
                                />
                                <Card.Content>
                                    <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                                        <Avatar
                                            size="xl"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                                            shape="rounded"
                                        />
                                    </div>
                                </Card.Content>
                            </Card>

                            {/* Instagram Card */}
                            <Card variant="elevated" rounded="xl" clickable>
                                <Card.Header icon={<IconBox bgColor="#e4405f"><InstagramIcon size={24} /></IconBox>} />
                                <Card.Content>
                                    <Text weight="semibold">Instagram</Text>
                                </Card.Content>
                                <Card.Footer>
                                    <Button variant="instagram" size="sm" shape="pill">Follow</Button>
                                </Card.Footer>
                            </Card>

                            {/* Twitter Card */}
                            <Card variant="elevated" rounded="xl" clickable>
                                <Card.Header icon={<IconBox bgColor="#1da1f2"><TwitterIcon size={24} /></IconBox>} />
                                <Card.Content>
                                    <Text weight="semibold">Twitter</Text>
                                    <Text size="sm" color="secondary">@biutyai</Text>
                                </Card.Content>
                                <Card.Footer>
                                    <Button variant="twitter" size="sm" shape="pill">Follow</Button>
                                </Card.Footer>
                            </Card>

                            {/* TikTok Card */}
                            <Card variant="elevated" rounded="xl" clickable>
                                <Card.Header icon={<IconBox bgColor="#000"><TikTokIcon size={24} /></IconBox>} />
                                <Card.Content>
                                    <Text weight="semibold">TikTok</Text>
                                    <Text size="sm" color="secondary">@biuty.ai</Text>
                                </Card.Content>
                                <Card.Footer>
                                    <Button variant="tiktok" size="sm" shape="pill" badge={8}>Follow</Button>
                                </Card.Footer>
                            </Card>

                            {/* Link Card */}
                            <Card variant="elevated" rounded="xl" clickable>
                                <Card.Header
                                    icon={
                                        <div style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 12,
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                        }}>
                                            <LinkIcon size={24} />
                                        </div>
                                    }
                                />
                                <Card.Content>
                                    <Text weight="semibold" truncate>
                                        Biuty - Start Your Beauty Science Journey
                                    </Text>
                                    <Text size="sm" color="secondary">biuty.ai</Text>
                                </Card.Content>
                            </Card>

                            {/* Map Card */}
                            <Card size="2x1" variant="elevated" rounded="xl" clickable style={{ gridColumn: 'span 2' }}>
                                <Card.Content style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <MapPinIcon size={20} />
                                        <Text weight="medium">Berlin, Germany</Text>
                                    </div>
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            background: '#3b82f6',
                                            boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.2)',
                                        }}
                                    />
                                </Card.Content>
                            </Card>
                        </div>
                    </section>
                </div>
            </div>
        </ThemeProvider>
    )
}
