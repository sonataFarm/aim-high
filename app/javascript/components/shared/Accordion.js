import React from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  accordion: {
    width: '100%'
  },
  accordionSummary: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '& svg': {
      color: 'white'
    }
  }
}));

const Accordion = ({ title, children }) => {
  const classes = useStyles();
  return (
    <MuiAccordion id="hi" classes={{ root: classes.accordion }}>
      <AccordionSummary expandIcon={<ExpandMore />} classes={{ root: classes.accordionSummary }}>
        <Typography variant="body1">{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;