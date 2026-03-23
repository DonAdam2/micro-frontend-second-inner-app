import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//components
import ConditionalWrapper from './ConditionalWrapper';

const Tabs = ({ activeTab, tabsList, isFancyTabs = true, isVertical }) => {
  const navigate = useNavigate(),
    { pathname } = useLocation(),
    isUrlTabs = tabsList.some((el) => el.tabUrl),
    [selectedTab, setSelectedTab] = useState(() =>
      activeTab !== 0 && activeTab && activeTab < tabsList.length ? activeTab : 0
    ),
    currentActiveTab = isUrlTabs
      ? (() => {
          const index = tabsList.findIndex((el) => el.tabUrl === pathname);
          return index !== -1 ? index : 0;
        })()
      : selectedTab;

  const onChangeTab = (index, tabUrl) => {
    if (tabUrl) navigate(tabUrl);
    else setSelectedTab(index);
  };

  return (
    <div className={`tabs ${isVertical ? 'vertical-tabs' : ''}`}>
      <div className={`${isFancyTabs ? 'fancy-labels-wrapper' : 'labels-wrapper'}`}>
        <ConditionalWrapper
          initialWrapper={(children) => <>{children}</>}
          wrapper={(children) => <div className="labels">{children}</div>}
          condition={isFancyTabs}
        >
          {tabsList.map((el, i) => (
            <div
              className={'tab-label' + (currentActiveTab === i ? ' active-tab-label' : '')}
              key={i}
              onClick={() => {
                onChangeTab(i, el.tabUrl);
              }}
            >
              {el.label}
            </div>
          ))}
        </ConditionalWrapper>
      </div>
      <div className="tabs-content-wrapper" style={{ borderRadius: isFancyTabs ? 10 : 0 }}>
        {tabsList.map((el, i) => (
          <div
            className={'tab-content' + (currentActiveTab === i ? ' active-tab-content' : '')}
            key={i}
          >
            {currentActiveTab === i && el.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
