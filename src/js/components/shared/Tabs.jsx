import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//components
import ConditionalWrapper from './ConditionalWrapper';

const Tabs = ({ activeTab, tabsList, isFancyTabs = true, isVertical }) => {
  const navigate = useNavigate(),
    { pathname } = useLocation(),
    [isUrlTabs, setIsUrlTabs] = useState(false),
    [currentActiveTab, setCurrentActiveTab] = useState();

  useEffect(() => {
    if (tabsList.find((el) => el.tabUrl)) {
      setIsUrlTabs(true);
    } else {
      if (activeTab !== 0 && activeTab && activeTab < tabsList.length) {
        setCurrentActiveTab(activeTab);
      } else {
        setCurrentActiveTab(0);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isUrlTabs) {
      const currentActiveTabUrlIndex = tabsList.findIndex((el) => el.tabUrl === pathname);
      setCurrentActiveTab(currentActiveTabUrlIndex !== -1 ? currentActiveTabUrlIndex : 0);
    }
    // eslint-disable-next-line
  }, [pathname, isUrlTabs]);

  const onChangeTab = (index, tabUrl) => {
    if (tabUrl) navigate(tabUrl);
    else setCurrentActiveTab(index);
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
