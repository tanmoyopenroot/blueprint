/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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

import * as React from "react";
import { normalizeKeyCombo } from "./hotkeyParser";

const KeyIcons: { [key: string]: string } = {
    alt: "pt-icon-key-option",
    cmd: "pt-icon-key-command",
    ctrl: "pt-icon-key-control",
    delete: "pt-icon-key-delete",
    down: "pt-icon-arrow-down",
    enter: "pt-icon-key-enter",
    left: "pt-icon-arrow-left",
    meta: "pt-icon-key-command",
    right: "pt-icon-arrow-right",
    shift: "pt-icon-key-shift",
    up: "pt-icon-arrow-up",
};

export interface IKeyComboProps {
    allowInInput?: boolean;
    combo: string;
    disabled?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}

export class KeyCombo extends React.Component<IKeyComboProps, {}> {
    public render() {
        const keys = normalizeKeyCombo(this.props.combo);
        const components = [] as JSX.Element[];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            const icon = KeyIcons[key];
            if (icon != null) {
                components.push(
                    <kbd className="pt-key pt-modifier-key" key={`key-${i}`}>
                        <span className={`pt-icon-standard ${icon}`} />
                        {key}
                    </kbd>,
                );
            } else {
                if (key.length === 1) {
                    key = key.toUpperCase();
                }
                components.push(
                    <kbd className="pt-key" key={`key-${i}`}>
                        {key}
                    </kbd>,
                );
            }
        }
        return <div className="pt-key-combo">{components}</div>;
    }
}
