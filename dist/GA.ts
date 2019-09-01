// Google Analytics Reporting API v4
// https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet?hl=ja
// https://developers.google.com/analytics/devguides/reporting/core/v4/samples?hl=ja
// https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/

interface IDateRange {
    startDate: string; endDate: string;
}

// https://www.lisz-works.com/entry/gas-ga2slack
// https://qiita.com/mimizq/items/fdda4b944a9608a2b0a1
export function get_ga_metrics(viewId: string) {
    // SELECT
    const metrics = [{
        alias: "ユーザ数", expression: "ga:users",
    },
    {
        alias: "セッション数", expression: "ga:sessions",
    },
    {
        alias: "直帰率%", expression: "ga:bounceRate",
    },
    {
        alias: "PV", expression: "ga:pageviews",
    }];

    // WHERE
    const nDaysAgo = 1;
    const dateRanges: IDateRange[] = findDateRanges(nDaysAgo);

    // GROUP BY
    const dimensions = [{
        name: "ga:pagePath",    // "ga:datehour"
    }];

    // ORDER BY
    const orderBys = [{
        fieldName: "ga:pagePath",
        sortOrder: "ASCENDING",
    }];

    // LIMIT
    const pageSize = 10;

    const request = { viewId, metrics, dateRanges, dimensions, orderBys, pageSize };
    const response = Analyticsreporting.Reports.batchGet({ reportRequests: [request] });

    const report = response.reports[0];

    if (report.data.rowCount < 1) {
        return "data not found";
    }

    Logger.log(report.data);

    const headers = report.columnHeader.metricHeader.metricHeaderEntries.map((_) => _.name);
    const numbers = report.data.totals[0].values.map((_) => {
        const num = parseFloat(_);
        return (num % 1 !== 0) ? num.toFixed(2) : num;
    });

    return headers.map((elm, i) => `${elm}: ${numbers[i]}`).join(", ");
}

function findDateRanges(nDaysAgo: number) {
    const today = new Date();
    const start = new Date(new Date().setDate(new Date().getDate() - nDaysAgo));

    return [{ startDate: formatDate(start), endDate: formatDate(today) }];
}

function formatDate(date: Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
}
