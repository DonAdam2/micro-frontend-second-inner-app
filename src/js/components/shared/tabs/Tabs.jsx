import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ activeTab, children }) => {
	const [currentActiveTab, setCurrentActiveTab] = useState(0);

	useEffect(() => {
		if (activeTab !== 0 && activeTab < children.length) {
			setCurrentActiveTab(activeTab);
		}
	}, [activeTab, children.length]);

	const onChangeTab = (index) => {
		setCurrentActiveTab(index);
	};

	return (
		<div className="tabs">
			<div className="labels-wrapper">
				{children.map((el, i) => (
					<div
						className={'tab-label' + (currentActiveTab === i ? ' active-tab-label' : '')}
						key={i}
						onClick={() => onChangeTab(i)}
					>
						{el.props.label}
					</div>
				))}
			</div>
			<div className="tabs-content-wrapper">
				{children.map((el, i) => (
					<div
						className={'tab-content' + (currentActiveTab === i ? ' active-tab-content' : '')}
						key={i}
					>
						{el.props.children}
					</div>
				))}
			</div>
		</div>
	);
};

Tabs.propTypes = {
	activeTab: PropTypes.number.isRequired,
};

export default Tabs;
