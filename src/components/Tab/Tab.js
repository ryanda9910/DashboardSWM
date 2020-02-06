import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tablist, Tab, Panelist, Panel } from 'react-tabtab';
import TabList from 'react-tabtab/lib/TabList';

class Tab extends React.Component {
    render() {
        <Tabs>
            <TabList>
                <Tab></Tab>
            </TabList>
            <Panelist>
            </Panelist>
            <Panel>
            </Panel>
        </Tabs>
    }
}

export default Tab;