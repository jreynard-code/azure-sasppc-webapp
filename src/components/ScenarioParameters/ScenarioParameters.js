// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { SCENARIO_RUN_STATE } from '../../utils/ApiUtils';
import { getDateAtMidnight } from '../../utils/DateUtils';
import {
  SCENARIO_PARAMETERS_TABS_CONFIG,
  START_DATE_PARAM,
  END_DATE_PARAM,
  SIM_GRANULARITY_PARAM,
  OPTIM_OBJECTIVE_PARAM,
  MANAGE_BACKLOG_PARAM,
  EMPTY_OBSOLETE_STOCKS_PARAM,
  BATCH_SIZE_PARAM,
  FINANCIAL_COST_PARAM,
  UNCERTAINTIES_DISTRIBUTION_PARAM,
  CHOICE_FLOW_MODE_PARAM,
  MASS_ACTION_LEVER_PARAM
} from '../../config/ScenarioParameters';
import { EditModeButton, NormalModeButton, ScenarioParametersTabs } from './components';
import { useTranslation } from 'react-i18next';
import { SimpleTwoActionsDialog, UPLOAD_FILE_STATUS_KEY } from '@cosmotech/ui';
import {
  TimeConfiguration,
  OptimizationConfiguration,
  UncertaintyConfiguration,
  BehaviorConfiguration
} from './components/tabs';
import { UploadFileUtils } from './UploadFileUtils';
import { ScenarioParametersUtils } from './ScenarioParametersUtils';
import DatasetService from '../../services/dataset/DatasetService';
import { ORGANIZATION_ID } from '../../config/AppInstance';

const constructParameterData = ScenarioParametersUtils.constructParameterData;
const getValueFromParameters = ScenarioParametersUtils.getValueFromParameters;

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    background: theme.palette.background.secondary,
    marginLeft: '30px',
    height: '50px',
    paddingTop: '10px'
  },
  rightBar: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(3)}px`
  }
}));

const fetchDatasetById = async (datasetId) => {
  const { error, data } = await DatasetService.findDatasetById(ORGANIZATION_ID, datasetId);
  if (error) {
    throw new Error('Dataset does not exist for this organization');
  }
  return data;
};

const ScenarioParameters = ({
  editMode,
  changeEditMode,
  updateAndLaunchScenario,
  launchScenario,
  workspaceId,
  currentScenario,
  scenarioId
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // General states
  const [displayPopup, setDisplayPopup] = useState(false);
  const defaultScenarioParameters = useRef([]);

  // Initialize state for scenario parameters
  const [startDate, setStartDate] = useState(getValueFromParameters(
    defaultScenarioParameters.current, START_DATE_PARAM));
  const [endDate, setEndDate] = useState(getValueFromParameters(
    defaultScenarioParameters.current, END_DATE_PARAM));
  const [simulationGranularity, setSimulationGranularity] = useState(
    getValueFromParameters(defaultScenarioParameters.current, SIM_GRANULARITY_PARAM));
  const [optimizationObjective, setOptimizationObjective] = useState(
    getValueFromParameters(defaultScenarioParameters.current, OPTIM_OBJECTIVE_PARAM));
  const [choiceFlowMode, setChoiceFlowMode] = useState(
    getValueFromParameters(defaultScenarioParameters.current, CHOICE_FLOW_MODE_PARAM));

  const [manageBacklog, setManageBacklog] = useState(
    getValueFromParameters(defaultScenarioParameters.current, MANAGE_BACKLOG_PARAM));
  const [emptyObsoleteStock, setEmptyObsoleteStock] = useState(
    getValueFromParameters(defaultScenarioParameters.current, EMPTY_OBSOLETE_STOCKS_PARAM));
  const [batchSize, setBatchSize] = useState(
    getValueFromParameters(defaultScenarioParameters.current, BATCH_SIZE_PARAM));
  const [financialCost, setFinancialCost] = useState(
    getValueFromParameters(defaultScenarioParameters.current, FINANCIAL_COST_PARAM));
  const [uncertaintiesDitribution, setUncertaintiesDitribution] = useState(
    getValueFromParameters(defaultScenarioParameters.current, UNCERTAINTIES_DISTRIBUTION_PARAM));

  const setStartDateAtMidnight = (date) => {
    if (date === undefined || date === null) {
      return;
    }
    setStartDate(getDateAtMidnight(date));
  };
  const setEndDateAtMidnight = (date) => {
    if (date === undefined || date === null) {
      return;
    }
    setEndDate(getDateAtMidnight(date));
  };

  // State for File Upload
  const [massActionLeverFile, setMassActionLeverFile] = useState({
    parameterId: MASS_ACTION_LEVER_PARAM.id,
    description: MASS_ACTION_LEVER_PARAM.description,
    initialName: '',
    name: '',
    file: null,
    status: UPLOAD_FILE_STATUS_KEY.EMPTY
  });
  const [massActionLeverDataset, setMassActionLeverDataset] = useState({});
  const [massActionLeverDatasetId, setMassActionLeverDatasetId] = useState('');

  useEffect(() => {
    const scenarioParameters = currentScenario.data.parametersValues;
    defaultScenarioParameters.current = scenarioParameters;
    const massActionLeverParameter = currentScenario.data?.parametersValues
      ?.find(el => el.parameterId === MASS_ACTION_LEVER_PARAM.id);
    setMassActionLeverDatasetId(massActionLeverParameter?.value === undefined ? '' : massActionLeverParameter.value);
    // eslint-disable-next-line
  }, [currentScenario]);

  useEffect(() => {
    // Reset parameters
    resetParameters(false, defaultScenarioParameters.current);
    // eslint-disable-next-line
  }, [changeEditMode, currentScenario]);

  useEffect(() => {
    UploadFileUtils.updateDatasetState(massActionLeverDatasetId,
      massActionLeverFile,
      () => fetchDatasetById(massActionLeverDatasetId),
      massActionLeverDataset,
      setMassActionLeverDataset,
      setMassActionLeverFile);
    // eslint-disable-next-line
  }, [massActionLeverDatasetId]);

  const resetParameters = (resetFile, parameters) => {
    setStartDate(getValueFromParameters(parameters, START_DATE_PARAM));
    setEndDate(getValueFromParameters(parameters, END_DATE_PARAM));
    setSimulationGranularity(getValueFromParameters(parameters, SIM_GRANULARITY_PARAM));
    setOptimizationObjective(getValueFromParameters(parameters, OPTIM_OBJECTIVE_PARAM));
    setManageBacklog(getValueFromParameters(parameters, MANAGE_BACKLOG_PARAM));
    setEmptyObsoleteStock(getValueFromParameters(parameters, EMPTY_OBSOLETE_STOCKS_PARAM));
    setBatchSize(getValueFromParameters(parameters, BATCH_SIZE_PARAM));
    setFinancialCost(getValueFromParameters(parameters, FINANCIAL_COST_PARAM));
    setUncertaintiesDitribution(getValueFromParameters(parameters, UNCERTAINTIES_DISTRIBUTION_PARAM));
    setChoiceFlowMode(getValueFromParameters(parameters, CHOICE_FLOW_MODE_PARAM));

    // Upload file
    if (resetFile) {
      UploadFileUtils.resetUploadFile(massActionLeverDatasetId, massActionLeverFile,
        setMassActionLeverFile);
    }
  };

  // TODO Change it in by a function using parameters values
  // eslint-disable-next-line
  const getParametersDataForApi = (newDataset, runTemplateId) => {
    let parametersData = [
      {
        parameterId: 'scenario_name',
        varType: 'string',
        value: currentScenario.data.name,
        isInherited: false
      }
    ];

    // Add control configuration parameters
    if (['ClientSpecificLever'].indexOf(runTemplateId) === -1) {
      const manageBacklogParam = constructParameterData(MANAGE_BACKLOG_PARAM, manageBacklog);
      const emptyObsoleteStockParam = constructParameterData(EMPTY_OBSOLETE_STOCKS_PARAM, emptyObsoleteStock);
      const batchSizeParam = constructParameterData(BATCH_SIZE_PARAM, batchSize);
      const financialCostParam = constructParameterData(FINANCIAL_COST_PARAM, financialCost);
      parametersData = parametersData.concat([
        manageBacklogParam,
        emptyObsoleteStockParam,
        batchSizeParam,
        financialCostParam
      ]);
    }

    // Add time configuration parameters
    if (['ClientSpecificLever'].indexOf(runTemplateId) === -1) {
      const startDateParam = constructParameterData(START_DATE_PARAM, startDate);
      const endDateParam = constructParameterData(END_DATE_PARAM, endDate);
      const simulationGranularityParam = constructParameterData(SIM_GRANULARITY_PARAM, simulationGranularity);
      parametersData = parametersData.concat([
        startDateParam,
        endDateParam,
        simulationGranularityParam
      ]);
    }

    // Add optimization parameter for 'MILPOptimization' run template
    if (['MILPOptimization'].indexOf(runTemplateId) !== -1) {
      const optimizationObjectiveParam = constructParameterData(
        OPTIM_OBJECTIVE_PARAM, optimizationObjective);
      const choiceFlowModeParam = constructParameterData(
        CHOICE_FLOW_MODE_PARAM, choiceFlowMode);
      parametersData = parametersData.concat([
        optimizationObjectiveParam,
        choiceFlowModeParam
      ]);
    }

    // Add uncertainty parameter for 'UncertaintyAnalysis' run template
    if (['UncertaintyAnalysis'].indexOf(runTemplateId) !== -1) {
      const uncertaintiesDitributionParam = constructParameterData(
        UNCERTAINTIES_DISTRIBUTION_PARAM, uncertaintiesDitribution);
      parametersData = parametersData.concat([
        uncertaintiesDitributionParam
      ]);
    }

    if (newDataset && Object.keys(newDataset).length !== 0) {
      parametersData = parametersData.concat([
        {
          parameterId: MASS_ACTION_LEVER_PARAM.id,
          varType: MASS_ACTION_LEVER_PARAM.varType,
          value: newDataset.id
        }
      ]);
    }

    return parametersData;
  };

  // Popup part
  const handleClickOnDiscardChangeButton = () => setDisplayPopup(true);
  const handleClickOnPopupCancelButton = () => setDisplayPopup(false);
  const handleClickOnPopupDiscardChangeButton = () => {
    setDisplayPopup(false);
    changeEditMode(false);
    // Reset form values
    resetParameters(true, defaultScenarioParameters.current);
  };

  // Normal Mode Screen
  const handleClickOnEditButton = () => changeEditMode(true);
  const isCurrentScenarioRunning = () => (currentScenario.data.state === SCENARIO_RUN_STATE.RUNNING);
  const areParametersValid = () => {
    if (currentScenario.data.runTemplateId !== 'ClientSpecificLever') {
      return true;
    }
    // For ClientSpecificLever run template, check that the file is not empty
    return (massActionLeverFile.name !== '' &&
      massActionLeverFile.status !== UPLOAD_FILE_STATUS_KEY.READY_TO_DELETE);
  };

  const isRunDisabled = () => isCurrentScenarioRunning() || !areParametersValid();

  const handleClickOnLaunchScenarioButton = () => {
    // FIXME: scenario name needs to be updated after a child scenario creation
    // The application must thus call updateAndLaunch action systematically
    handleClickOnUpdateAndLaunchScenarioButton();

    // // If scenario parameters have never been updated, do it now
    // if (!currentScenario.data.parametersValues ||
    //     currentScenario.data.parametersValues.length === 0) {
    //   handleClickOnUpdateAndLaunchScenarioButton();
    // } else {
    //   launchScenario(workspaceId, scenarioId);
    //   changeEditMode(false);
    // }
  };

  const handleClickOnUpdateAndLaunchScenarioButton = async () => {
    const newDataset = await UploadFileUtils.updateDatasetPartFile(massActionLeverDataset,
      setMassActionLeverDataset,
      massActionLeverFile,
      setMassActionLeverFile,
      massActionLeverDatasetId,
      setMassActionLeverDatasetId,
      MASS_ACTION_LEVER_PARAM.id,
      MASS_ACTION_LEVER_PARAM.connectorId,
      currentScenario.data.id,
      workspaceId);

    const parametersData = getParametersDataForApi(newDataset, currentScenario.data.runTemplateId);
    defaultScenarioParameters.current = parametersData;
    updateAndLaunchScenario(workspaceId, scenarioId, parametersData);
    changeEditMode(false);
  };

  const fileUploadComponent = UploadFileUtils.constructFileUpload('0',
    massActionLeverFile,
    setMassActionLeverFile,
    massActionLeverDataset.id,
    MASS_ACTION_LEVER_PARAM.defaultFileTypeFilter,
    editMode,
    currentScenario.data,
    workspaceId);

  // Indices in this array must match indices in the tabs configuration file
  // configs/ScenarioParametersTabs.config.js
  const scenarioParametersTabs = [
    <TimeConfiguration key="0"
      startDate={startDate}
      endDate={endDate}
      simulationGranularity={simulationGranularity}
      setStartDate={setStartDateAtMidnight}
      setEndDate={setEndDateAtMidnight}
      setSimulationGranularity={setSimulationGranularity}
      editMode={editMode}
    />,
    <BehaviorConfiguration key="1"
    manageBacklog={manageBacklog}
    setManageBacklog={setManageBacklog}
    emptyObsoleteStock={emptyObsoleteStock}
    setEmptyObsoleteStock={setEmptyObsoleteStock}
    batchSize={batchSize}
    setBatchSize={setBatchSize}
    financialCost={financialCost}
    setFinancialCost={setFinancialCost}
    editMode={editMode}
    />,
    fileUploadComponent,
    <OptimizationConfiguration key="3"
    optimizationObjective={optimizationObjective}
    setOptimizationObjective={setOptimizationObjective}
    choiceFlowMode={choiceFlowMode}
    setChoiceFlowMode={setChoiceFlowMode}
    editMode={editMode}
    />,
    <UncertaintyConfiguration key="4"
    uncertaintiesDistribution={uncertaintiesDitribution}
    setUncertaintiesDistribution={setUncertaintiesDitribution}
    editMode={editMode}
    />
  ];

  // Disable edit button if no tabs are shown
  let tabsShown = false;
  for (const tab of SCENARIO_PARAMETERS_TABS_CONFIG) {
    if (tab.runTemplateIds.indexOf(currentScenario.data.runTemplateId) !== -1) {
      tabsShown = true;
      break;
    }
  }

  let runButtonTooltipText = '';
  if (!areParametersValid()) {
    runButtonTooltipText = 'Scenario parameters are not valid. Please upload a file.';
  }

  return (
      <div>
        <Grid container direction="column" justifyContent="center" alignContent="flex-start" >
          <Grid
            container
            className={classes.root}
            direction="row"
            justifyContent="space-between"
            alignContent="flex-start"
            spacing={5}
          >
            <Grid item >
              <Typography variant='subtitle1'>
                { t('genericcomponent.text.scenario.parameters.title', 'Scenario parameters') }
              </Typography>
            </Grid>
            <Grid item >
              { editMode
                ? (<EditModeButton classes={classes}
                  handleClickOnDiscardChange={handleClickOnDiscardChangeButton}
                  handleClickOnUpdateAndLaunchScenario={handleClickOnUpdateAndLaunchScenarioButton}
                  runDisabled={isRunDisabled()}
                  runButtonTooltipText={runButtonTooltipText}
                />)
                : (<NormalModeButton classes={classes}
                  handleClickOnEdit={handleClickOnEditButton}
                  handleClickOnLaunchScenario={handleClickOnLaunchScenarioButton}
                  editDisabled={!tabsShown || isCurrentScenarioRunning()}
                  runDisabled={isRunDisabled()}
                  runButtonTooltipText={runButtonTooltipText}
                />)
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.tabs}>
          {
            <form>
              <ScenarioParametersTabs
                tabs={scenarioParametersTabs}
                currentScenario={currentScenario}
              />
            </form>
          }
        </Grid>
        <SimpleTwoActionsDialog
            id={'discard-changes'}
            open={displayPopup}
            labels={
              {
                title: t('genericcomponent.dialog.scenario.parameters.title'),
                body: t('genericcomponent.dialog.scenario.parameters.body'),
                button1: t('genericcomponent.dialog.scenario.parameters.button.cancel'),
                button2: t('genericcomponent.dialog.scenario.parameters.button.validate'),
                ariaLabelledby: 'discard-changes-dialog'
              }
            }
            handleClickOnButton1={handleClickOnPopupCancelButton}
            handleClickOnButton2={handleClickOnPopupDiscardChangeButton}
          />
      </div>
  );
};

ScenarioParameters.propTypes = {
  editMode: PropTypes.bool.isRequired,
  changeEditMode: PropTypes.func.isRequired,
  updateAndLaunchScenario: PropTypes.func.isRequired,
  launchScenario: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  scenarioId: PropTypes.string.isRequired,
  currentScenario: PropTypes.object.isRequired
};

export default ScenarioParameters;
