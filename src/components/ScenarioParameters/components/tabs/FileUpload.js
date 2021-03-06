// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { UploadFile, SelfDestructLinkButton } from '@cosmotech/ui';
import { UploadFileUtils } from '../../UploadFileUtils';
import { useTranslation } from 'react-i18next';
import { SCENARIO_PARAMETERS_SHOW_DATASET_DOWNLOAD_BUTTON } from '../../../../config/ScenarioParameters';
import ScenarioService from '../../../../services/scenario/ScenarioService';

const DATASET_DOWNLOAD_TIMEOUT = 15 * 60;
const DATASET_DOWNLOAD_POLLING_DELAY = 10 * 1000;

const useStyles = makeStyles(theme => ({
  datasetDownloadButton: {
    marginBottom: '15px'
  }
}));

const FileUpload = ({
  workspaceId,
  scenario,
  keyValue,
  acceptedFileTypesToUpload,
  datasetId,
  file,
  setFile,
  editMode
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);
  const timeout = (ms) => {
    return new Promise(resolve => { timeoutId.current = setTimeout(resolve, ms); });
  };

  const startPolling = async (sdlId) => {
    let jobInfo;
    let state;
    jobInfo = await ScenarioService.getScenarioDataDownloadJobInfo(workspaceId, scenario.id, sdlId);
    state = jobInfo?.state;
    while (state === 'Running' || state === 'Unknown') {
      await timeout(DATASET_DOWNLOAD_POLLING_DELAY);
      jobInfo = await ScenarioService.getScenarioDataDownloadJobInfo(workspaceId, scenario.id, sdlId);
      state = jobInfo.state;
    }
    if (state === 'Successful') {
      return jobInfo.url;
    }
    console.error('Error during generation of dataset download link');
    return '';
  };

  const generate = async () => {
    const sdlId = await ScenarioService.downloadScenarioData(workspaceId, scenario.id);
    return await startPolling(sdlId);
  };

  const labels = {
    button: t('genericcomponent.uploadfile.button.browse'),
    invalidFileMessage: t('genericcomponent.uploadfile.tooltip.isvalidfile')
  };

  const megaLeverProps = {
    download: t('genericcomponent.uploadfile.mass_action_lever.download',
      'mass_action_lever.download'),
    generateLink: t('genericcomponent.uploadfile.mass_action_lever.generate',
      'mass_action_lever.generate')
  };

  return (
    <div>
      {
        SCENARIO_PARAMETERS_SHOW_DATASET_DOWNLOAD_BUTTON && (
          <div className={classes.datasetDownloadButton}>
            <SelfDestructLinkButton
              generate={generate}
              labels={megaLeverProps}
              timeout={DATASET_DOWNLOAD_TIMEOUT}
              width="350px"
              height="40px"
            />
          </div>
        )
      }
      <UploadFile key={keyValue}
        acceptedFileTypes={acceptedFileTypesToUpload}
        handleUploadFile={(event) => UploadFileUtils.prepareToUpload(event, file, setFile)}
        handleDeleteFile={() => UploadFileUtils.prepareToDeleteFile(file, setFile)}
        handleDownloadFile={(event) => {
          event.preventDefault();
          UploadFileUtils.downloadFile(datasetId, file, setFile);
        }}
        file={file}
        editMode={editMode}
        labels={labels}
      />
    </div>);
};

FileUpload.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  scenario: PropTypes.object.isRequired,
  keyValue: PropTypes.string,
  acceptedFileTypesToUpload: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
  datasetId: PropTypes.string
};

export default FileUpload;
