import React, { ReactNode } from 'react';

declare module 'react' {
  // Extending HTMLAttributes to include a 'name' attribute for custom use cases
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
}


/** 
 * Text that can be renderable. Used for component props, like button text.
 * 
 * @example
 * label={
 *    <>
 *      <Icon ... />
 *      <Text>Lorem Ipsum</Text>
 *    </>
 * }
 */
export type RenderText = string | number | ReactNode | JSX.Element;
