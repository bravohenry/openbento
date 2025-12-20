// OpenBento Type Definitions

// ============ Widget Types ============

export type WidgetType =
    | 'link'
    | 'social'
    | 'spotify'
    | 'youtube'
    | 'map'
    | 'text'
    | 'image'
    | 'podcast'
    | 'github'
    | 'newsletter';

export type WidgetSize = '1x1' | '2x1' | '1x2' | '2x2' | '3x1' | '4x1' | '4x2';

export interface WidgetPosition {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface WidgetStyle {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundGradient?: string;
    borderRadius?: number;
    textColor?: string;
    accentColor?: string;
}

// Base widget interface
export interface BaseWidget {
    id: string;
    type: WidgetType;
    position: WidgetPosition;
    style?: WidgetStyle;
    isVisible: boolean;
    order: number;
}

// Specific widget content types
export interface LinkWidgetContent {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
}

export interface SocialWidgetContent {
    platform: 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'facebook' | 'threads';
    username: string;
    displayName?: string;
    profileUrl: string;
    followerCount?: number;
    avatarUrl?: string;
    bio?: string;
}

export interface SpotifyWidgetContent {
    embedType: 'track' | 'album' | 'artist' | 'playlist' | 'podcast';
    spotifyId: string;
    embedUrl: string;
    title?: string;
    artist?: string;
    coverUrl?: string;
}

export interface YouTubeWidgetContent {
    videoId: string;
    embedUrl: string;
    title?: string;
    thumbnailUrl?: string;
    channelName?: string;
}

export interface MapWidgetContent {
    latitude: number;
    longitude: number;
    address?: string;
    label?: string;
    zoom?: number;
}

export interface TextWidgetContent {
    text: string;
    fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    alignment?: 'left' | 'center' | 'right';
    label?: string;
}

export interface ImageWidgetContent {
    imageUrl: string;
    altText?: string;
    link?: string;
    objectFit?: 'cover' | 'contain' | 'fill';
}

export interface PodcastWidgetContent {
    platform: 'apple' | 'spotify' | 'google' | 'rss';
    feedUrl?: string;
    podcastId?: string;
    showName: string;
    episodes?: {
        id: string;
        title: string;
        date: string;
        duration: string;
    }[];
}

export interface GithubWidgetContent {
    username: string;
    repoName?: string;
    avatarUrl?: string;
    followers?: number;
    repos?: number;
    bio?: string;
}

export interface NewsletterWidgetContent {
    platform: 'substack' | 'buttondown' | 'convertkit' | 'mailchimp' | 'custom';
    name: string;
    description?: string;
    subscriberCount?: number;
    subscribeUrl: string;
}

// Union type for all widget content
export type WidgetContent =
    | { type: 'link'; content: LinkWidgetContent }
    | { type: 'social'; content: SocialWidgetContent }
    | { type: 'spotify'; content: SpotifyWidgetContent }
    | { type: 'youtube'; content: YouTubeWidgetContent }
    | { type: 'map'; content: MapWidgetContent }
    | { type: 'text'; content: TextWidgetContent }
    | { type: 'image'; content: ImageWidgetContent }
    | { type: 'podcast'; content: PodcastWidgetContent }
    | { type: 'github'; content: GithubWidgetContent }
    | { type: 'newsletter'; content: NewsletterWidgetContent };

// Complete widget type
export interface Widget extends BaseWidget {
    content: WidgetContent['content'];
}

// ============ Profile Types ============

export interface ProfileTheme {
    background: {
        type: 'solid' | 'gradient' | 'image';
        value: string;
        blur?: boolean;
    };
    card: {
        background: string;
        borderRadius: number;
        shadow: 'none' | 'sm' | 'md' | 'lg';
        border?: string;
    };
    text: {
        primary: string;
        secondary: string;
        fontFamily?: string;
    };
    accent: string;
}

export interface Profile {
    id: string;
    userId: string;
    username: string;
    displayName: string;
    bio?: string;
    avatar?: string;
    theme: ProfileTheme;
    widgets: Widget[];
    isPublic: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============ User Types ============

export interface User {
    id: string;
    email: string;
    username: string;
    name?: string;
    image?: string;
    emailVerified?: Date;
    profile?: Profile;
    createdAt: Date;
    updatedAt: Date;
}

// ============ API Types ============

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ============ Editor Types ============

export interface EditorState {
    isDirty: boolean;
    isPreview: boolean;
    selectedWidgetId: string | null;
    clipboard: Widget | null;
    history: {
        past: Widget[][];
        future: Widget[][];
    };
}

// ============ UI Types ============

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

// ============ Utility Types ============

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
