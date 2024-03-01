// cypress/integration/data-validation-test.js

// To import the JSON data from the file
import jsonData from '../src/configs/test_input';

// To import the test configuration from the file
import testConfig from '../src/configs/url_input.json';

// To destructure the testUrl from the configuration
const { testUrl } = testConfig;

describe('Data Validation Test', () => {
  it('Inserts and Validates JSON Data', () => {
    // To visit the dynamic-table.html page 
    cy.visit(testUrl);

    // To click the summary to reveal the table data
    cy.get('summary').should('contain', 'Table Data').click();

    // To select the element with the ID "jsondata"
    cy.get('#jsondata')
      .clear() // Clear the content of the text area
      .type(JSON.stringify(jsonData), { parseSpecialCharSequences: false })
      .blur(); // Trigger the blur event

    // To click on the Refresh
    cy.get('[id="refreshtable"]').click();

    // To wait to load the content
    cy.wait(1000); 

    // To fetch the inserted data from your application
    cy.get('[id="jsondata"]').then(($textarea) => {
      const text = $textarea.val(); // Retrieve the value of the text area
      const fetchedData = JSON.parse(text);

      // To vlidate the inserted data
      expect(fetchedData).to.deep.equal(jsonData);
    });
  });
});