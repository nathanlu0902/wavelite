export interface TdSwiperProps {
    animation?: {
        type: StringConstructor;
        value?: 'slide';
    };
    autoplay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    current?: {
        type: NumberConstructor;
        value?: number;
    };
    defaultCurrent?: {
        type: NumberConstructor;
        value?: number;
    };
    direction?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    duration?: {
        type: NumberConstructor;
        value?: number;
    };
    height?: {
        type: NumberConstructor;
        value?: number;
    };
    interval?: {
        type: NumberConstructor;
        value?: number;
    };
    loop?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    navigation?: {
        type: ObjectConstructor;
        value?: SwiperNavigation;
    };
    paginationPosition?: {
        type: StringConstructor;
        value?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
    };
}
export interface SwiperNavigation {
    minShowNum?: number;
    showSlideBtn?: boolean;
    type?: SwiperNavigationType;
}
export declare type SwiperNavigationType = 'dots' | 'dots-bar' | 'fraction';
