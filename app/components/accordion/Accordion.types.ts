import type { ReactNode } from "react";
import type { RenderText } from "~/types/react-app";

export interface AccordionProps {
    children?: ReactNode;
    title: RenderText;
    headClassName?: string;
    opened?: boolean;
    increasePadOnClose?: boolean;
    thick?: boolean;
    smallArrow?: boolean;
    noCollapse?: boolean;
    noHover?: boolean;
    noDivider?: boolean;
    noDividerAbs?: boolean;
    noDividerClosed?: boolean;
    noDividerOpened?: boolean;
    noDividerChild?: boolean;
}
