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

import { AnchorButton, Classes, Hotkey, Hotkeys, HotkeysTarget, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/labs";

import * as classNames from "classnames";
import * as React from "react";

export interface IPackageInfo {
    /** Name of package. Ignored for documentation site versions. */
    name?: string;
    url: string;
    version: string;
}

export interface INavbarActionsProps {
    onToggleDark: (useDark: boolean) => void;
    releases: IPackageInfo[];
    useDarkTheme: boolean;
}

@HotkeysTarget
export class NavbarActions extends React.PureComponent<INavbarActionsProps, {}> {
    public render() {
        return (
            <div className={classNames(Classes.BUTTON_GROUP, Classes.MINIMAL)}>
                <AnchorButton href="https://github.com/palantir/blueprint" target="_blank" text="GitHub" />
                <Popover2 inline={true} content={this.renderReleasesMenu()} placement="bottom-end">
                    <AnchorButton rightIconName="caret-down" text="Releases" />
                </Popover2>
                <AnchorButton
                    className="docs-dark-switch"
                    onClick={this.handleDarkSwitchChange}
                    iconName={this.props.useDarkTheme ? "flash" : "moon"}
                />
            </div>
        );
    }

    public renderHotkeys() {
        return (
            <Hotkeys>
                <Hotkey
                    global={true}
                    combo="shift + d"
                    label="Toggle dark theme"
                    onKeyDown={this.handleDarkSwitchChange}
                />
            </Hotkeys>
        );
    }

    /**
     * Render a list of the latest artifacts versions, including links to them on Stash and Artifactory.
     * Also include a link to the GitHub release notes.
     */
    private renderReleasesMenu() {
        const menuItems = this.props.releases.map((version: IPackageInfo, index: number) => (
            <MenuItem href={version.url} key={index} label={version.version} target="_blank" text={version.name} />
        ));
        return (
            <Menu>
                <MenuItem
                    href="https://github.com/palantir/blueprint/releases"
                    iconName="book"
                    target="_blank"
                    text="Release notes"
                />
                <MenuDivider />
                {menuItems}
            </Menu>
        );
    }

    private handleDarkSwitchChange = () => {
        this.props.onToggleDark(!this.props.useDarkTheme);
    };
}
