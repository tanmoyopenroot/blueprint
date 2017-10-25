/*
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

import { InteractionModeEngine } from "../common/interactionMode";

export const FOCUS_DISABLED_CLASS = "pt-focus-disabled";

/* istanbul ignore next */
const fakeFocusEngine = {
    isActive: () => true,
    start: () => true,
    stop: () => true,
};

/* istanbul ignore next */
const focusEngine =
    typeof document !== "undefined"
        ? new InteractionModeEngine(document.documentElement, FOCUS_DISABLED_CLASS)
        : fakeFocusEngine;

// this is basically meaningless to unit test; it requires manual UI testing
/* istanbul ignore next */
export const FocusStyleManager = {
    alwaysShowFocus: () => focusEngine.stop(),
    isActive: () => focusEngine.isActive(),
    onlyShowFocusOnTabs: () => focusEngine.start(),
};
