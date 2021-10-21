/*
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *  
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */
describe("do nothing", () => {
    const username = 'admin'
    const password = 'admin'

    beforeEach(function () {
        cy.loginToPublisher(username, password)
        // login before each test
    });

    it.only("Add Authorization Header for the api", () => {
        const endpoint = 'https://petstore.swagger.io/v2/store/inventory';
        cy.createAPIWithoutEndpoint();
        cy.get('[data-testid="left-menu-itemendpoints"]').click();
        cy.get('[data-testid="Prototype Endpoint"]').click();
        cy.get('[data-testid="prototype_endpoint-start"]').click();

        cy.get('[data-testid="primaryEndpoint-endpoint-text-field"]').then(() => {
            cy.get('[data-testid="primaryEndpoint-endpoint-text-field"] input').focus().type(endpoint);   
        });

        // Save
        cy.get('[data-testid="endpoint-save-btn"]').then(() => {
            cy.get('[data-testid="endpoint-save-btn"]').click();   
        });

        cy.get('[data-testid="left-menu-itemlifecycle"]').click();
        cy.get('button[data-testid="Deploy as a Prototype"]').then(() => {
            cy.get('button[data-testid="Deploy as a Prototype"]').click();
        });
        cy.get('button[data-testid="Demote to Created"]').should('exist');
    });

    after(function () {
        // Test is done. Now delete the api
        cy.get(`[data-testid="itest-id-deleteapi-icon-button"]`).click();
        cy.get(`[data-testid="itest-id-deleteconf"]`).click();
    })
});