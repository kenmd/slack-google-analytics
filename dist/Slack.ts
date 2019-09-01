import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

const props = PropertiesService.getScriptProperties();
const SLACK_WEBHOOK_URL = props.getProperty("SLACK_WEBHOOK_URL");

interface ISlackPayload {
    [key: string]: string;
}

export function send_to_slack(text: string) {
    const payload = {
        text,
    };

    post_slack(payload);
}

// https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
function post_slack(payload: ISlackPayload) {
    const options: URLFetchRequestOptions = {
        contentType: "application/json",
        method: "post",
        payload: JSON.stringify(payload),
    };

    UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
}
