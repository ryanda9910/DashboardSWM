import React, {Component} from 'react';
import {Tabs, TabList, Tab, PanelList, Panel, ExtraButton, styled} from 'react-tabtab';
// import * as TabulationStyle from './TabulationStyle';
import * as customStyle from 'react-tabtab/lib/themes/material-design';
import s from './Tabulation.module.scss'

export default class Tabulation extends Component {
  constructor(props){
    super(props);
    const tabs = this.makeData(0);
    this.state= {
      tabs,
      activeIndex: 0,
    }
  }

  makeData = (number, titlePrefix = 'Tab') => {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push({
        title: `${titlePrefix} ${i}`,
        content:
        <div>
          Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae velit. <br/>
          Ad molestiae magni quidem saepe et quia voluptatibus minima. <br/>
          Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab. <br/>
        </div>
      });
    }
    return data;
  }

  handleSidebarMenuClick = () => {
    const {tabs} = this.state;
    // ambil akhiran url
    const slug = this.props.locationPath.split('/').slice(-1).pop();
    if(slug === 'panelmeter'){
      slug = 'Panel Meter';
      const newTabs = [...tabs, {title: slug, content: 'New Content'}];
      this.setState({tabs: newTabs, activeIndex: newTabs.length - 1});
    }
    console.log(slug);
  }

  handleExtraButton = () => {
    const {tabs} = this.state;
    const newTabs = [...tabs, {title: 'New Tab', content: 'New Content'}];
    this.setState({tabs: newTabs, activeIndex: newTabs.length - 1});
  }

  handleTabChange = (index) => {
    this.setState({activeIndex: index});
  }

  handleEdit = ({type, index}) => {
    this.setState((state) => {
      let {tabs, activeIndex} = state;
      if (type === 'delete') {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return {tabs, activeIndex};
    });
  }

  render() {

    console.log(this.props);
    const slug = this.props.locationPath.split('/').slice(-1).pop();
    console.log(slug);
    // TAB 
    const { tabs, activeIndex } = this.state;
    const tabItem = [];
    const panelTemplate = [];
    tabs.forEach((tab, i) => {
      // console.log(i);  
      // console.log(tab);
      const closable = tabs.length > 0;
      tabItem.push(<Tab key={i} closable={closable}>{tab.title}</Tab>);
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    })
    
    return (
      <div className={s.asd}>
        <Tabs 
          customStyle={customStyle}
          onTabEdit={this.handleEdit}
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          customStyle={this.props.customStyle}
          ExtraButton={
            <ExtraButton onClick={this.handleExtraButton}>
              {/* <Plus/> */}
              +
            </ExtraButton>
          }
        >
          <TabList>
            {tabItem}
          </TabList>
          {/* <PanelList>
            {panelTemplate}
          </PanelList> */}
        </Tabs>
      </div>
    )
  }
}