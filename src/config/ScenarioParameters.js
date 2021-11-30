// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getDateAtMidnight } from '../utils/DateUtils';

export const SCENARIO_PARAMETERS_SHOW_DATASET_DOWNLOAD_BUTTON = true;

export const SCENARIO_PARAMETERS_TABS_CONFIG = [
  {
    id: 0,
    translationKey: 'commoncomponents.tab.scenario.parameters.time_configuration',
    label: 'Time configuration',
    value: 'time_configuration',
    runTemplateIds: [
      'UncertaintyAnalysis',
      'Lever',
      'Simulation',
      'MILPOptimization'
    ]
  },
  {
    id: 1,
    translationKey: 'commoncomponents.tab.scenario.parameters.behavior_configuration',
    label: 'Model behavior configuration',
    value: 'behavior_configuration',
    runTemplateIds: [
      'UncertaintyAnalysis',
      'Lever',
      'Simulation',
      'MILPOptimization'
    ]
  },
  {
    id: 2,
    translationKey: 'commoncomponents.tab.scenario.parameters.mass_action_lever',
    label: 'Mass action lever',
    value: 'mass_action_lever',
    runTemplateIds: [
      'Simulation',
      'MILPOptimization',
      'ClientSpecificLever',
      'Lever'
    ]
  },
  {
    id: 3,
    translationKey: 'commoncomponents.tab.scenario.parameters.optimization_configuration',
    label: 'Optimization configuration',
    value: 'optimization_configuration',
    runTemplateIds: [
      'MILPOptimization'
    ]
  },
  {
    id: 4,
    translationKey: 'commoncomponents.tab.scenario.parameters.uncertainty_configuration',
    label: 'Uncertainties configuration',
    value: 'uncertainties_configuration',
    runTemplateIds: [
      'UncertaintyAnalysis'
    ]
  }
];

// Time configuration parameters
const getDefaultStartDate = () => getDateAtMidnight(new Date());
const getDefaultEndDate = () => getDefaultStartDate();

export const START_DATE_PARAM = {
  id: 'start_date',
  varType: 'date',
  defaultValue: getDefaultStartDate()
};

export const END_DATE_PARAM = {
  id: 'end_date',
  varType: 'date',
  defaultValue: getDefaultEndDate()
};

export const SIM_GRANULARITY_PARAM = {
  id: 'simulation_granularity',
  varType: 'enum',
  defaultValue: 'day'
};

export const OPTIM_OBJECTIVE_PARAM = {
  id: 'optimization_objective',
  varType: 'enum',
  defaultValue: 'ServiceLevelMaximization'
};

export const MANAGE_BACKLOG_PARAM = {
  id: 'manage_backlog_quantities',
  varType: 'bool',
  defaultValue: false
};

export const EMPTY_OBSOLETE_STOCKS_PARAM = {
  id: 'empty_obsolete_stocks',
  varType: 'bool',
  defaultValue: false
};

export const BATCH_SIZE_PARAM = {
  id: 'batch_size',
  varType: 'number',
  defaultValue: 0.0
};

export const FINANCIAL_COST_PARAM = {
  id: 'financial_cost_of_stocks',
  varType: 'number',
  defaultValue: 0.0
};

export const UNCERTAINTIES_DISTRIBUTION_PARAM = {
  id: 'uncertainties_probability_distribution',
  varType: 'enum',
  defaultValue: 'Gaussian'
};

export const CHOICE_FLOW_MODE_PARAM = {
  id: 'choice_flow_mode',
  varType: 'enum',
  defaultValue: 'PushedFlows'
};

export const MASS_ACTION_LEVER_PARAM = {
  id: 'mass_lever_excel_file',
  description: 'Mass action lever dataset part',
  varType: '%DATASETID%',
  connectorId: 'c-6wdww33xkd5d',
  defaultFileTypeFilter: '.xlsx,.zip'
};
