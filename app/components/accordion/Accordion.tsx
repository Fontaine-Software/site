import { useState, lazy, Suspense, memo } from "react";
import type { AccordionProps } from "./Accordion.types";
import Box from "../box/Box";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import Skeleton from "../skeleton/Skeleton";

import ErrorBoundary from "../error/ErrorBoundary";
import ErrorFallback from "../error/error-fallback/ErrorFallback";

import "./Accordion.styles.scss"

const Collapse = lazy(() => import('@mui/material/Collapse'));

const AccordionComponent = memo((props: AccordionProps) => {
    const [open, setOpen] = useState(props.opened || false);

    const noDivider      = props.noDivider      || props.noDividerAbs || props.noDividerClosed || (open && props.noDividerOpened) || false
    const noDividerChild = props.noDividerChild || props.noDividerAbs || props.noDividerClosed || false

    const headClassNames = [
        "Accord-Head-root",
        "ali-cen jus-con-spa-bet",
        "accord-head",
        props.headClassName,
        (props.increasePadOnClose && !open) && "pad-15-v",
        (props.increasePadOnClose && open)  && "pad-10-v",
        props.thick   ?  "Accord-thick" : "pad-5-b",
        open          && "accord-head-opened",
        !noDivider    && "accord-divider",
        props.noHover && "accord-no-hover"
    ].filter(Boolean).join(" ");

    const childClassNames = [
        "Accord-Child-root",
        noDividerChild ? "" : "child-divider",
        props.noDividerClosed && "child-has-head-divider",
        open && props.noDividerOpened && "child-has-bottom-divider",
    ].filter(Boolean).join(" ");

    return (
        <Box col name="Accordion">
            <Box name="Accordion Head" className={headClassNames} onClick={() => setOpen(prev => !prev)}>
                <Text body1 className="fs-16 mar-0" >{props.title}</Text>
                <Icon icon={open ? "arrowUp" : "arrowDown"} size={!props.smallArrow && "m"} />
            </Box>
            {props.noCollapse ? open &&
                <Box name="Accordion Child" className={childClassNames} col>
                    {props.children}
                </Box>
            :
            <Suspense fallback={open && <Skeleton large hasText />}>
                <Collapse in={open} unmountOnExit={props.unmountOnExit}>
                <Box name="Accordion Child" className={childClassNames} col>
                    {props.children}
                </Box>
                </Collapse>
            </Suspense>
            }
        </Box>
    )
});

export default function Accordion(props: AccordionProps) {
    return (
        <ErrorBoundary fallback={(errorMessage) => <ErrorFallback container center small errorMessage={errorMessage} originComponent="Accordion" />}>
            <AccordionComponent {...props} />
        </ErrorBoundary>
    );
}
