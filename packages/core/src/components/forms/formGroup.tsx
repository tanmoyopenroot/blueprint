/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { IIntentProps, IProps } from "../../common/props";

export interface IFormGroupProps extends IIntentProps, IProps {
    /**
     * Whether form group should appear as non-interactive.
     * Remember that `input` elements must be disabled separately.
     */
    disabled?: boolean;

    /** Optional helper text. The given content will be wrapped in `.pt-form-helper-text` and displayed beneath `children`. */
    helperText?: React.ReactNode;

    /** Whether to render the label and children on a single line. */
    inline?: boolean;

    /** Label of this form group. */
    label?: React.ReactNode;

    /**
     * `id` attribute of the labelable form element that this `FormGroup` controls,
     * used as `<label for>` attribute.
     */
    labelFor?: string;

    /**
     * Whether this form input should appear as required (does not affect HTML form required status).
     * Providing a boolean `true` value will render a default "required" message after the `label` prop.
     * Providing a JSX value will render that content instead.
     *
     * _Note:_ the default message element is exposed as `FormGroup.DEFAULT_REQUIRED_CONTENT` and
     * can be changed to provide a new global default for your app.
     * @default false
     */
    requiredLabel?: boolean | React.ReactNode;
}

@PureRender
export class FormGroup extends React.Component<IFormGroupProps, {}> {
    /**
     * Element used to render `required` message when a boolean value is provided for that prop.
     * Modifying the value of this property will change the default globally in your app.
     *
     * Defaults to `<span class="pt-text-muted">(required)</span>`.
     */
    public static DEFAULT_REQUIRED_CONTENT = <span className={Classes.TEXT_MUTED}>(required)</span>;

    public render() {
        const { children, label, labelFor } = this.props;
        return (
            <div className={this.getClassName()}>
                <label className={Classes.LABEL} htmlFor={labelFor}>
                    {label}
                    {this.maybeRenderRequiredLabel()}
                </label>
                <div className={Classes.FORM_CONTENT}>
                    {children}
                    {this.maybeRenderHelperText()}
                </div>
            </div>
        );
    }

    private getClassName() {
        const { className, disabled, inline, intent } = this.props;
        return classNames(
            Classes.FORM_GROUP,
            Classes.intentClass(intent),
            {
                [Classes.DISABLED]: disabled,
                [Classes.INLINE]: inline,
            },
            className,
        );
    }

    private maybeRenderRequiredLabel() {
        const { requiredLabel } = this.props;
        return requiredLabel === true ? FormGroup.DEFAULT_REQUIRED_CONTENT : requiredLabel;
    }

    private maybeRenderHelperText() {
        const { helperText } = this.props;
        if (!helperText) {
            return null;
        }
        return <div className={Classes.FORM_HELPER_TEXT}>{helperText}</div>;
    }
}
