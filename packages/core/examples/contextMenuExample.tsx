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

// tslint:disable max-classes-per-file

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";

import { ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { BaseExample } from "@blueprintjs/docs";

/**
 * This component uses the imperative ContextMenu API.
 */
@PureRender
class GraphNode extends React.Component<{}, { isContextMenuOpen: boolean }> {
    public state = { isContextMenuOpen: false };

    public render() {
        const classes = classNames("context-menu-node", { "context-menu-open": this.state.isContextMenuOpen });
        return <div className={classes} onContextMenu={this.showContextMenu} />;
    }

    private showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        // must prevent default to cancel parent's context menu
        e.preventDefault();
        // invoke static API, getting coordinates from mouse event
        ContextMenu.show(
            <Menu>
                <MenuItem iconName="search-around" text="Search around..." />
                <MenuItem iconName="search" text="Object viewer" />
                <MenuItem iconName="graph-remove" text="Remove" />
                <MenuItem iconName="group-objects" text="Group" />
                <MenuDivider />
                <MenuItem disabled={true} text="Clicked on node" />
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => this.setState({ isContextMenuOpen: false }),
        );
        // indicate that context menu is open so we can add a CSS class to this element
        this.setState({ isContextMenuOpen: true });
    };
}

/**
 * This component uses the decorator API and implements the IContextMenuTarget interface.
 */
@ContextMenuTarget
export class ContextMenuExample extends BaseExample<{}> {
    public className = "docs-context-menu-example";

    public renderContextMenu(e: React.MouseEvent<HTMLElement>) {
        return (
            <Menu>
                <MenuItem iconName="select" text="Select all" />
                <MenuItem iconName="insert" text="Insert...">
                    <MenuItem iconName="new-object" text="Object" />
                    <MenuItem iconName="new-text-box" text="Text box" />
                    <MenuItem iconName="star" text="Astral body" />
                </MenuItem>
                <MenuItem iconName="layout" text="Layout...">
                    <MenuItem iconName="layout-auto" text="Auto" />
                    <MenuItem iconName="layout-circle" text="Circle" />
                    <MenuItem iconName="layout-grid" text="Grid" />
                </MenuItem>
                <MenuDivider />
                <MenuItem disabled={true} text={`Clicked at (${e.clientX}, ${e.clientY})`} />
            </Menu>
        );
    }

    public renderExample() {
        return <GraphNode />;
    }

    protected renderOptions() {
        return <span>Right-click on node or background.</span>;
    }
}
