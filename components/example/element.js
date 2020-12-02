import '../src/x-180672-snc-ac-component-test';

const el = document.createElement('x-180672-snc-ac-component-test');
el.componentTagName = "snc-wds-va-adaptive-card";
el.controlData = {
    cardTemplate: {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.3",
        "body": [
            {
                "type": "TextBlock",
                "text": "${text}",
                "wrap": true
            }
        ]
    },
    cardData: {
        text: 'Placeholder for input-defined Adaptive Card.'
    }
};
document.body.appendChild(el);