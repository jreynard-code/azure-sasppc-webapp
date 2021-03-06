// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import {
  POWER_BI_FIELD_ENUM,
  PowerBIReportEmbedSimpleFilter
} from '@cosmotech/azure';

// For further information about settings or filters see:
// https://github.com/microsoft/powerbi-client-react
// based on
// https://github.com/microsoft/PowerBI-JavaScript
// using
// https://github.com/microsoft/powerbi-models
export const SCENARIO_DASHBOARD_CONFIG = [
  {
    title: {
      en: 'Scenario dashboard',
      fr: 'Rapport du scenario'
    },
    reportId: '27df322b-a230-4041-8e8c-734c8dc8b550',
    settings: {
      navContentPaneEnabled: false,
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      }
    },
    dynamicFilters: [
      new PowerBIReportEmbedSimpleFilter('GetScenarios', 'LastSimulationRun',
        POWER_BI_FIELD_ENUM.SCENARIO_CSM_SIMULATION_RUN)
    ],
    pageName: {
      en: 'ReportSectionf0bd28f6841925a40020',
      fr: 'ReportSectionf0bd28f6841925a40020'
    }
  }
];

// For further information about settings or filters see:
// https://github.com/microsoft/powerbi-client-react
// based on
// https://github.com/microsoft/PowerBI-JavaScript
// using
// https://github.com/microsoft/powerbi-models
export const DASHBOARDS_LIST_CONFIG = [
  {
    title: {
      en: 'Scorecard',
      fr: 'Scorecard'
    },
    reportId: 'd2f6987c-2bcf-4351-b939-ffb306964b10',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true
        }
      }
    },
    pageName: {
      en: 'ReportSection007766d808b40ee0e2aa',
      fr: 'ReportSection007766d808b40ee0e2aa'
    }
  },
  {
    title: {
      en: 'KPIs',
      fr: 'KPIs'
    },
    reportId: 'e064b3b0-32d5-4a54-923c-434aba6c0f21',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true
        }
      }
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection'
    }
  },
  {
    title: {
      en: 'Bottlenecks identification',
      fr: 'Bottlenecks identification'
    },
    reportId: '204d1351-7483-4137-8ccb-ba01e398f50a',
    settings: {
      navContentPaneEnabled: false,
      panes: {
        filters: {
          expanded: true,
          visible: true
        }
      }
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection'
    }
  },
  {
    title: {
      en: 'Input Data',
      fr: 'Input Data'
    },
    reportId: '82af5333-400f-4d18-bb64-cd41e8f9ef9d',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true
        }
      }
    },
    pageName: {
      en: 'ReportSection3fe7d3fa163e8d89c07f',
      fr: 'ReportSection3fe7d3fa163e8d89c07f'
    }
  }
];
