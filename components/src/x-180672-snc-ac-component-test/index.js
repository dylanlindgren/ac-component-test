import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

import * as ACData from "adaptivecards-templating";
import * as AdaptiveCards from "adaptivecards";
import markdownit from "markdown-it";

import airplane from "./cards/airplane.json";
import weather from "./cards/weather.json";
import basic from "./cards/basic.json";

AdaptiveCards.AdaptiveCard.onProcessMarkdown = function (text, result) {
	result.outputHtml = markdownit().render(text);
	result.didProcess = true;
};

var adaptiveCard = new AdaptiveCards.AdaptiveCard();

const view = (state) => {

	const { properties } = state;

	adaptiveCard.onExecuteAction = function (action) {
		if (action._propertyBag.type === 'Action.OpenUrl') {
			window.open(action._propertyBag.url, action._propertyBag.title || '_blank');
		}
	};

	var cd;

	if (properties.type === '1') {
		cd = basic;
	} else if (properties.type === '2') {
		cd = airplane;
	} else if (properties.type === '3') {
		cd = weather;
	}

	var template = new ACData.Template(cd.cardTemplate);
	var cardPayload = template.expand({ $root: cd.cardData });
	adaptiveCard.parse(cardPayload);
	const renderedCard = adaptiveCard.render();
	return <div className="sncWdsVaAdaptiveCards" ref={(n) => { n && n.appendChild(renderedCard) }}></div>;
};

createCustomElement('x-180672-snc-ac-component-test', {
	renderer: { type: snabbdom },
	view,
	properties: {
		type: {
			default: "1"
		},
		forceCloseControl: false,
		responseValue: {
			default: false
		}
	},
	styles
});
