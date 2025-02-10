import type { TextProps } from './Text.types';
import type { classNameSetterDef } from '../../mixins/propSetters';
import {memo, Children, type ReactNode} from 'react';
import Tooltip from "../tooltip/Tooltip";
import { toneSetter, tooltipSetter, classNameSetter } from '../../mixins/propSetters';

import "./Text.styles.scss"

import ErrorBoundary from "../error/ErrorBoundary";
import ErrorFallback from "../error/error-fallback/ErrorFallback";

function isTextNode(children: ReactNode) {
    return Children.toArray(children).every(child =>
        typeof child === 'string' || typeof child === 'number'
    );
}

const TextComponent = memo((props: TextProps) => {
    
    const defProps: classNameSetterDef = {
        textAlign: 'left'
    }
    const numeral = props.numeral || props.numeralSlim

    // ======= Labels =======

    const label = toneSetter({props, surface: true, custom: "label"})
    
    // ======= Set classNames =======

    const classNames = [
        "Text-root",
        classNameSetter(props, defProps),
        label,
        props.label    && `label ${props.labelThin ? "thin" : ""}`,
        props.length   && `len-${props.length}`,
        props.onClick  && "cursor-click",
        props.link     && "link",
        props.noMar    && "mar-0",
        props.noWrap   && "text-nowrap",
        props.ellipsis && "text-ellipsis",  // Show ...
        props.clip     && "text-clip",      // Like ellipsis. No dots. Dots will eat up length
        props.scroll   && "text-scroll",
        props.fit      && "width-fit-con height-fit-con",
        props.thin     && "thin",
        props.bold     && "bold",
        props.italic   && "italic",
        props.lineThrough && "line-through",
        props.subdued  && "subdued",
        props.exact    && "exact",
        numeral        && `numeral-badge ${props.numeralSlim ? "slim" : ""}`,
        props.heading  && `text-heading-${props.heading}`,
        props.body     && `text-body-${props.body}`,
    ].filter(Boolean).join(" ");

    const Component = props.as ? props.as : !isTextNode(props.children) ? 'div' : 'p';

    return (
        <Tooltip {...tooltipSetter(props)}>
            <Component className={classNames} {...(props.onClick && { onClick: () => { props.onClick!(); } })}>
                {props.children || props.text}
            </Component>
        </Tooltip>
    );
});

export default function Text(props: TextProps) {
    return (
        <ErrorBoundary fallback={(errorMessage) => <ErrorFallback container center small errorMessage={errorMessage} originComponent="Text" />}>
            <TextComponent {...props} />
        </ErrorBoundary>
    );
}