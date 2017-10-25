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

import { Classes, Intent, Switch, Tag } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange } from "@blueprintjs/docs";
import * as classNames from "classnames";
import * as moment from "moment";
import * as React from "react";

import { DatePicker } from "../src";

const FORMAT = "dddd, LL";

export const Moment: React.SFC<{ date: Date; format?: string }> = ({ date, format = FORMAT }) => {
    const m = moment(date);
    if (m.isValid()) {
        return (
            <Tag className={Classes.LARGE} intent={Intent.PRIMARY}>
                {m.format(format)}
            </Tag>
        );
    } else {
        return <Tag className={classNames(Classes.LARGE, Classes.MINIMAL)}>no date</Tag>;
    }
};

export interface IDatePickerExampleState {
    date?: Date;
    showActionsBar?: boolean;
}

export class DatePickerExample extends BaseExample<IDatePickerExampleState> {
    public state: IDatePickerExampleState = {
        date: null,
        showActionsBar: false,
    };

    private toggleActionsBar = handleBooleanChange(showActionsBar => this.setState({ showActionsBar }));

    protected renderExample() {
        return (
            <div className="docs-datetime-example">
                <DatePicker
                    className={Classes.ELEVATION_1}
                    onChange={this.handleDateChange}
                    showActionsBar={this.state.showActionsBar}
                />
                <Moment date={this.state.date} />
            </div>
        );
    }

    protected renderOptions() {
        return [
            [
                <Switch
                    checked={this.state.showActionsBar}
                    label="Show actions bar"
                    key="Actions"
                    onChange={this.toggleActionsBar}
                />,
            ],
        ];
    }

    private handleDateChange = (date: Date) => this.setState({ date });
}
