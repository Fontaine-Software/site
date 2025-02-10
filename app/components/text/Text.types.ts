import type { ReactNode } from "react";
import type { lenType, tooltipSetterProps, classNameSetterProps, ToneType, textAlignType } from '~/mixins/propSetters';
import type { RenderText } from "~/types/react-app";

export interface TextProps extends tooltipSetterProps, classNameSetterProps {
    numeral?: boolean;
    numeralSlim?: boolean;
    length?: lenType;
    label?: ToneType;
    link?: boolean;
    noMar?: boolean;
    noWrap?: boolean;
    ellipsis?: boolean;
    clip?: boolean;
    scroll?: boolean;
    bold?: boolean;
    italic?: boolean;
    lineThrough?: boolean;
    subdued?: boolean;
    exact?: boolean;
    heading?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5';
    body?: 1 | 2 | '1' | '2'
    fit?: boolean;
    thin?: boolean;
    labelThin?: boolean;
    as?: 'span' | 'p';
    children?: RenderText;
    text?: RenderText;
    align?: textAlignType;
    onClick?: () => void;
}