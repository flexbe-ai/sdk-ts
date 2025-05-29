// Animation enums and string union types
export type PageEntityAnimationAdaptiveMode = 'inherited' | 'redefined' | 'disabled';
export type PageEntityAnimationRetriggerBehavior = 'reverse' | 'restart' | 'pause' | 'reset' | 'none';
export type PageEntityAnimationPlayMode = 'normal' | 'bounce';
export type PageEntityAnimationReverseSeekBehavior = 'seek' | 'stop';
export type PageEntityAnimationSeekAxis = 'x' | 'y';
export type PageEntityAnimationTriggerEvent = 'start' | 'complete' | 'loopstart' | 'loopcomplete' | 'pause' | 'unpause';
export type PageEntityAnimationInteractionType = 'none' | 'screen' | 'scroll' | 'click' | 'hover' | 'hold' | 'trigger' | 'custom';
export type PageEntityAnimationIntersectionLine = 'top' | 'center' | 'bottom';
export type PageEntityAnimationIntersectionLineOffsetUnit = 'px' | '%';

export interface PageEntityAnimationStep {
    id: string;
    name: string;
    distance: number;
    animationParams: {
        clipPath?: string;
        clipPathEnabled?: boolean;
        skewEnabled?: boolean;
        seekEasing?: string;
        opacity?: string | number;
        duration?: number;
        rotate?: number;
        easing?: string;
        translateX?: string;
        translateY?: string;
        scaleX?: number;
        scaleY?: number;
        skewX?: string;
        skewY?: string;
    };
}

export interface PageEntityAnimationInteractionSettings {
    intersectionLine?: PageEntityAnimationIntersectionLine;
    intersectionLineOffset?: string;
    retriggerBehavior?: PageEntityAnimationRetriggerBehavior;
    loop?: number;
    playMode?: PageEntityAnimationPlayMode;
    seekMode?: string;
    seekAxis?: PageEntityAnimationSeekAxis;
    seekSmoothing?: number;
    triggerElements?: string[];
    triggerAnimationItem?: string;
    triggerEvent?: PageEntityAnimationTriggerEvent;
    fixed?: boolean;
}

export interface PageEntityAnimationDeviceConfig {
    enabled: boolean;
    inherit: boolean | string;
    animationType?: string;
    interactionType?: PageEntityAnimationInteractionType;
    interactionSettings?: PageEntityAnimationInteractionSettings;
    steps: PageEntityAnimationStep[];
}

export interface PageEntityAnimationResponsive {
    desktop?: PageEntityAnimationDeviceConfig;
    mobile?: Partial<PageEntityAnimationDeviceConfig>;
}

export interface PageEntityAnimation {
    id?: string | number;
    responsive: PageEntityAnimationResponsive;
    [key: string]: any;
}
