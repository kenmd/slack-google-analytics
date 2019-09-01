import { get_ga_metrics } from "./GA";
import { send_to_slack } from "./Slack";

const props = PropertiesService.getScriptProperties();
const GA_VIEW_ID = props.getProperty("GA_VIEW_ID");

function myFunction() {
    try {
        const metrics = get_ga_metrics(GA_VIEW_ID);
        Logger.log(metrics);

        send_to_slack(`[${GA_VIEW_ID}] ${metrics}`);
    } catch (error) {
        Logger.log(JSON.stringify(error));
    }
}
