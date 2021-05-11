import React from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  accordion: {
    width: '100%'
  }
});

const Accordion = ({ title, children }) => {
  const classes = useStyles();
  return (
    <MuiAccordion id="hi" classes={{ root: classes.accordion }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;