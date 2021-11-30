// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: '20px'
  }
}));

const DatasetDownloadButton = ({
  downloadDataset,
  disabled
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={downloadDataset}
        color="primary"
        disabled={disabled}
      >
        {t('genericcomponent.button.download.dataset', 'Download dataset from ADT')}
      </Button>
    </div>
  );
};

DatasetDownloadButton.propTypes = {
  downloadDataset: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default DatasetDownloadButton;
