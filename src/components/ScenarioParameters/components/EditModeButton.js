// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Tooltip
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const EditModeButton = ({
  classes,
  handleClickOnDiscardChange,
  handleClickOnUpdateAndLaunchScenario,
  runDisabled,
  runButtonTooltipText
}) => {
  const { t } = useTranslation();
  return (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              data-cy="discard-button"color="primary"
              onClick={handleClickOnDiscardChange}>
                {t('commoncomponents.button.scenario.parameters.discard', 'Discard Modifications')}
            </Button>
          </Grid>
          <Grid item>
            <Tooltip arrow title={runButtonTooltipText}>
              <span>
                <Button
                data-cy="update-and-launch-scenario" startIcon={<PlayCircleOutlineIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleClickOnUpdateAndLaunchScenario}
                  disabled={runDisabled}>
                    {t('commoncomponents.button.scenario.parameters.update.launch', 'Update And Launch Scenario')}
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
  );
};

EditModeButton.propTypes = {
  classes: PropTypes.any.isRequired,
  handleClickOnDiscardChange: PropTypes.func.isRequired,
  handleClickOnUpdateAndLaunchScenario: PropTypes.func.isRequired,
  runDisabled: PropTypes.bool.isRequired,
  runButtonTooltipText: PropTypes.string
};

export default EditModeButton;
