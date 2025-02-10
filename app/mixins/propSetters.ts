export type ToneType = "info" | "success" | "warning" | "critical" | "grey" | "dark" | 'secondary' | "tertiary" | "quaternary" | '';

export interface Tones {
    props: {
        tone?: ToneType;
        [key: string]: any; // For dynamic access like props[custom]
    };
    notSurface?: {
        success?: boolean;
        warning?: boolean;
        critical?: boolean;
    }
    surface?: boolean;
    secondary?: boolean;
    hov?: boolean;
    def?: ToneType;
    custom?: string;
}

export function toneSetter({ props, surface = false, notSurface={}, secondary = false, hov = false, def = "", custom = "" }: Tones): string {
    const toneMap: Record<ToneType | number, string> = {
        info: "info",
        3:       `success ${surface ? notSurface.success ? "" : "surface" : ""} ${hov ? "hov" : ""}`,
        success: `success ${surface ? notSurface.success ? "" : "surface" : ""} ${hov ? "hov" : ""}`,
        1:       `warning ${surface ? notSurface.warning ? "" : "surface" : ""} ${hov ? "hov" : ""}`,
        warning: `warning ${surface ? notSurface.warning ? "" : "surface" : ""} ${hov ? "hov" : ""}`,
        2:        `critical ${surface ? notSurface.critical ? "" : "surface" : ""} ${secondary ? "secondary" : ""} ${hov ? "hov" : ""}`,
        critical: `critical ${surface ? notSurface.critical ? "" : "surface" : ""} ${secondary ? "secondary" : ""} ${hov ? "hov" : ""}`,
        0: 'grey',
        grey: "grey",
        dark: "dark",
        secondary: "secondary-surface",
        tertiary: "tertiary",
        quaternary: "quaternary",
        '': '',
    };

    for (const key of [props.tone, props[custom]]) {
        if (key in toneMap) {
            return `tone ${toneMap[key]}`;
        }
    }

    return `tone ${def}`;
}

export type lenType = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 13 | 15 | 17 | 20 | 25 | 30 | 40 | 50
export type minLenType = 3 | 5| 7 | 10 | 13 | 15 | 17 | 20 | 25 | 30 | 40 | 50

export type gapType = 
    | 0 | 3 | 5 | 10 | 15 | 20 | 25 | 30 
    | '0' | '3' | '5' | '10' | '15' | '20' | '25' | '30'
export type padType = 
    | 0 | 3 | 5 | 8 | 10 | 15 | 20
    | '0' | '3' | '5' | '8' | '10' | '15' | '20'
export type marType = 
    | 0 | 5 | 10 | 15 | 20
    | '0' | '5' | '10' | '15' | '20'

export type justifyType = 'none' | 'left' | 'cen' | 'right' | 'flex-end' | 'spa-bet' | 'spa-aro' | 'spa-eve'
export type alignType = 'left' | 'cen' | 'right' | 'baseline'
export type textAlignType = 'left' | 'cen' | 'right'
export type selfType = 'just-cen' | 'ali-cen' | 'ali-baseline'

export interface classNameSetterProps {
    gap?: gapType;
    pad?: padType;
    mar?: marType;
    self?: selfType
    just?: justifyType;
    align?: alignType;
    textAlign?: textAlignType;
    className?: string;
    click?: boolean;
    center?: boolean;
}

export interface classNameSetterDef {
    gap?: gapType;
    pad?: padType;
    mar?: marType;
    textAlign?: textAlignType;
}

export function classNameSetter(props: classNameSetterProps, def: classNameSetterDef = {}) {

    const gapClass = props.gap ? `gap-${props.gap}` : def.gap ? `gap-${def.gap}` : ""
    const padClass = props.pad ? `pad-${props.pad}` : def.pad ? `pad-${def.pad}` : ""
    const marClass = props.mar ? `mar-${props.mar}` : def.mar ? `mar-${def.mar}` : ""

    const justClass = {
        none: "jus-con-none",
        left: "jus-con-left",
        cen: "jus-con-cen",
        right: "jus-con-right",
        "flex-end": "jus-con-flex-end",
        "spa-bet": "jus-con-spa-bet",
        "spa-aro": "jus-con-spa-aro",
        "spa-eve": "jus-con-spa-eve",
    }[props.just! || ""];

    const alignClass = {
        left: "ali-item-flex-start",
        cen: "ali-item-cen",
        right: "ali-item-flex-end",
        baseline: "ali-item-baseline"
    }[props.align! || ""];

    const selfClass = {
        'just-cen': "jus-self-cen",
        'ali-cen': "ali-self-cen",
        'ali-baseline': "ali-self-baseline"
    }[props.self! || ""]

    const textAlignClass = {
        left: "tex-ali-left",
        cen: "tex-ali-cen",
        right: "tex-ali-right",
    }[props.textAlign! || def.textAlign || ""];
    
    return [
        props.className,
        props.click     && "cursor-click",
        props.center    && "flex-cen ali-cen",
        gapClass, padClass, marClass, justClass, alignClass, textAlignClass, selfClass
    ].filter(Boolean).join(" ")
}

export interface tooltipSetterProps {
    tooltipText?: string | JSX.Element | false | number;
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
    enterDelay?: number;
    noArrow?: boolean;
}

export function tooltipSetter(props: tooltipSetterProps) {
    return {
        title:      props.tooltipText      || "",
        placement:  props.tooltipPlacement || "top",
        enterDelay: props.enterDelay       || 300,
        noArrow:    props.noArrow          || false
    }
}