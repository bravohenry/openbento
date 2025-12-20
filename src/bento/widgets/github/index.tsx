'use client';

import React from 'react';
import { registerWidget, type WidgetProps } from '../registry';
import { Card } from '@/design-system/patterns/Card';
import { Flex, Text } from '@/design-system/primitives';
import { colors } from '@/design-system/tokens';

// ============ GitHub Widget Config ============

export interface GithubWidgetConfig {
    username: string;
    repoName?: string;
    avatarUrl?: string;
    followers?: number;
    repos?: number;
    bio?: string;
}

// ============ GitHub Widget Component ============

function GithubWidget({ config, size }: WidgetProps<GithubWidgetConfig>) {
    const { username, bio, followers = 0, repos = 0 } = config;

    return (
        <Card 
      size= { size }
    variant = "solid"
    style = {{
        background: colors.social.github,
            color: 'white',
      }
}
    >
    <Card.Header>
    <GithubIcon />
    < Text size = "sm" weight = "semibold" style = {{ color: 'white' }}>
        GitHub
        </Text>
        </Card.Header>

        < Card.Content >
        <Flex direction="column" gap = { 2} style = {{ marginTop: 'auto' }}>
            <Text size="lg" weight = "bold" style = {{ color: 'white' }}>
                @{ username }
                </Text>
{
    bio && (
        <Text size="sm" lines = { 2} style = {{ color: 'rgba(255,255,255,0.7)' }
}>
    { bio }
    </Text>
          )}
<Flex gap={ 4 } style = {{ marginTop: 8 }}>
    <Text size="xs" style = {{ color: 'rgba(255,255,255,0.8)' }}>
        <strong>{ followers } </strong> followers
        </Text>
        < Text size = "xs" style = {{ color: 'rgba(255,255,255,0.8)' }}>
            <strong>{ repos } </strong> repos
            </Text>
            </Flex>
            </Flex>
            </Card.Content>
            </Card>
  );
}

// GitHub Icon
function GithubIcon() {
    return (
        <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "white" >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
  );
}

// ============ Register Widget ============

registerWidget<GithubWidgetConfig>({
    type: 'github',
    name: 'GitHub',
    description: 'Display GitHub profile and stats',
    category: 'social',
    sizes: ['medium', 'large', 'small'],
    defaultSize: 'medium',
    component: GithubWidget,
    icon: GithubIcon,
    defaultConfig: {
        username: 'openbentodev',
        bio: 'Building beautiful bento grids',
        followers: 1234,
        repos: 42,
    },
});

export { GithubWidget };
