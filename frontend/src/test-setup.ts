import { configure } from '@testing-library/react';

// Pri merjenju pokritosti (coverage) teče koda počasneje, zato testom
// dovolimo, da na spremembo zaslona čakajo do 5 s namesto privzete 1 s.
configure({ asyncUtilTimeout: 5000 });